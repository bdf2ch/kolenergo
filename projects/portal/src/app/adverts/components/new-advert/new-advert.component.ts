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
import { AddAdvert, EditAdvert, selectNewAdvert } from '../../ngrx';
import { AdvertImageUploadAdapter } from './image-upload-adapter.class';
import { AdvertsService } from '../../services/adverts.service';

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
  }

  ngOnInit() {
    this.advert$ = this.store.pipe(select(selectNewAdvert));
    this.advertForm = this.builder.group({
      title: new FormControl(null, Validators.required),
      preview: new FormControl(null, Validators.required)
    });
    this.advert$.subscribe((advert: Advert) => {
      this.advert = advert;
      this.advertForm.get('title').setValue(this.advert.title);
      this.advertForm.get('preview').setValue(this.advert.preview);
    });

    this.advertForm.valueChanges.subscribe((value: any) => {
      this.advert.title = this.advertForm.get('title').value;
      this.advert.preview = this.advertForm.get('preview').value;
      this.formWithSteps.steps[0].isValid = (this.advertForm.valid && this.advertForm.dirty) && this.advert.content ? true : false;
      this.formWithSteps.steps[0].isInvalid = (this.advertForm.invalid && this.advertForm.dirty) || !this.advert.content ? true : false;
      console.log(value);
      console.log(this.advert);
    });
  }

  /**
   * Событие изменения содержимого WYSIWYG редакторп
   * @param value - Содержимое редактора
   */
  newAdvertContentChanged(value: any) {
    this.formWithSteps.steps[0].isValid = this.advertForm.valid && this.advert.content ? true : false;
    this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid || !this.advert.content ? true : false;
  }

  attachmentSelected(files: FileList) {

  }

  /**
   * Добавление нового объявления
   */
  addAdvert() {
    console.log(this.advert);
    this.advert.user = new User();
    this.advert.user.id = 7;
    if (!this.advert.id) {
      this.store.dispatch(new AddAdvert(this.advert));
    } else {
      this.store.dispatch(new EditAdvert(this.advert));
    }
    this.dialog.close();
  }
}
