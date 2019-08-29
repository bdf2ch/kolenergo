import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';


import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

import { User } from '@kolenergo/core';
import { FormStepManager } from '../../../../../../event-sheduler/src/app/event-sheduler/models/form-manager.model';
import { FormStep } from '../../../../../../event-sheduler/src/app/event-sheduler/models/form-step.model';
import { Advert } from '../../models';
import { IApplicationState } from '../../../ngrx';
import {
  AdvertsAddAdvert,
  AdvertsEditAdvert,
  selectNewAdvert,
  AdvertsUploadAttachmentToAdvert,
  AdvertsUploadAttachmentToNewAdvert
} from '../../ngrx';
import { AdvertImageUploadAdapter } from './image-upload-adapter.class';
import { AdvertsService } from '../../services/adverts.service';
import {Attachment} from "../../../portal/models";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-new-advert',
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.less']
})
export class NewAdvertComponent implements OnInit {
  public advert$: Observable<Advert>;
  public advert: Advert;
  // public attachments: Attachment[];
  public content: string;
  public Editor = ClassicEditor;
  public formWithSteps: FormStepManager;
  public advertForm: FormGroup;
  public matcher = new MyErrorStateMatcher();
  public editorConfig = {
    language: 'ru',
    extraPlugins: [(editor) => {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new AdvertImageUploadAdapter(loader, this.adverts, this.store);
      };
    }]
  };

  constructor(private readonly builder: FormBuilder,
              private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialogRef<NewAdvertComponent>,
              private readonly adverts: AdvertsService) {
    this.formWithSteps = new FormStepManager();
    this.formWithSteps.addStep(new FormStep('Содержание', 'Содержание объявления', 'info'));
    this.formWithSteps.addStep(new FormStep('Вложения', 'Прикрепленные файлы', 'attach_file'));
    // this.attachments = [];
    this.content = '';
  }

  ngOnInit() {
    this.advert$ = this.store.pipe(select(selectNewAdvert));
    this.advertForm = this.builder.group({
      title: new FormControl(null, Validators.required),
      preview: new FormControl(null, Validators.required)
    });
    this.advert$.subscribe((advert: Advert) => {
      console.log('advert', advert);
      this.advert = advert;
      // this.attachments = new Array(...advert.attachments);
      this.advertForm.get('title').setValue(this.advert.title);
      this.advertForm.get('preview').setValue(this.advert.preview);
    });

    this.advertForm.valueChanges.subscribe((value: any) => {
      this.advert.title = this.advertForm.get('title').value;
      this.advert.preview = this.advertForm.get('preview').value;
      this.formWithSteps.steps[0].isValid = (this.advertForm.valid && this.advertForm.dirty) && this.content ? true : false;
      this.formWithSteps.steps[0].isInvalid = (this.advertForm.invalid && this.advertForm.dirty) || !this.content ? true : false;
      console.log(value);
      console.log(this.advert);
    });
  }

  /**
   * Событие изменения содержимого WYSIWYG редакторп
   * @param value - Содержимое редактора
   */
  newAdvertContentChanged(value: any) {
    this.formWithSteps.steps[0].isValid = this.advertForm.valid && this.content ? true : false;
    this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid || !this.content ? true : false;
  }

  attachmentSelected(files: FileList) {
    if (this.advert.id) {
      this.store.dispatch(new AdvertsUploadAttachmentToAdvert(files));
    } else {
      this.store.dispatch(new AdvertsUploadAttachmentToNewAdvert(files));
    }
  }

  /**
   * Добавление нового объявления
   */
  addAdvert() {
    console.log(this.advert);
    this.advert.content = this.content;
    this.advert.user = new User();
    this.advert.user.id = 7;
    if (!this.advert.id) {
      this.store.dispatch(new AdvertsAddAdvert(this.advert));
    } else {
      this.store.dispatch(new AdvertsEditAdvert(this.advert));
    }
    this.dialog.close();
  }
}
