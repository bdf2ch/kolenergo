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
  AdvertsUploadAttachmentToNewAdvert,
  AdvertsUploadImageToNewAdvert,
  AdvertsUploadImageToAdvert,
  selectUploadingImageInProgress,
  selectDeletingImageInProgress,
  AdvertsResetNewAdvert,
  AdvertsDeleteAdvert,
  AdvertsDeleteAttachment,
  selectUploadingAttachmentInProgress, selectDeletingAttachmentInProgress, selectAddingInProgress, selectEditingInProgress
} from '../../ngrx';
import { AdvertImageUploadAdapter } from './image-upload-adapter.class';
import { AdvertsService } from '../../services/adverts.service';
import { environment } from '../../../../environments/environment';
import { Attachment } from '../../../portal/models';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    return !!(control && control.invalid && control.dirty);
  }
}

@Component({
  selector: 'app-new-advert',
  templateUrl: './advert-add-dialog.component.html',
  styleUrls: ['./advert-add-dialog.component.less']
})
export class AdvertAddDialogComponent implements OnInit {
  public advert$: Observable<Advert>;
  public addingInProgress$: Observable<boolean>;
  public addingInProgress: boolean;
  public editingInProgress$: Observable<boolean>;
  public editingInProgress: boolean;
  public uploadingImageInProgress$: Observable<boolean>;
  public uploadingAttachmentInProgress$: Observable<boolean>;
  public deletingImageInProgress$: Observable<boolean>;
  public deletingAttachmentInProgress$: Observable<boolean>;
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
  public env = environment;

  constructor(private readonly builder: FormBuilder,
              private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialogRef<AdvertAddDialogComponent>,
              private readonly adverts: AdvertsService) {
    this.formWithSteps = new FormStepManager();
    this.formWithSteps.addStep(new FormStep('Атрибуты', 'Заголовок и прочее', 'info'));
    this.formWithSteps.addStep(new FormStep('Содержание', 'Содержание объявления', 'notes'));
    this.formWithSteps.addStep(new FormStep('Вложения', 'Прикрепленные файлы', 'attach_file'));
    // this.attachments = [];
    this.content = '';
  }

  ngOnInit() {
    this.advert$ = this.store.pipe(select(selectNewAdvert));
    this.addingInProgress$ = this.store.pipe(select(selectAddingInProgress));
    this.editingInProgress$ = this.store.pipe(select(selectEditingInProgress));
    this.uploadingImageInProgress$ = this.store.pipe(select(selectUploadingImageInProgress));
    this.uploadingAttachmentInProgress$ = this.store.pipe(select(selectUploadingAttachmentInProgress));
    this.deletingImageInProgress$ = this.store.pipe(select(selectDeletingImageInProgress));
    this.deletingAttachmentInProgress$ = this.store.pipe(select(selectDeletingAttachmentInProgress));
    this.advertForm = this.builder.group({
      title: new FormControl(null, Validators.required),
      preview: new FormControl(null)
    });
    this.advert$.subscribe((advert: Advert) => {
      console.log('advert', advert);
      this.advert = advert;
      // this.attachments = new Array(...advert.attachments);
      this.advertForm.get('title').setValue(this.advert.title);
      this.advertForm.get('preview').setValue(this.advert.preview);
      this.content = advert.content;
    });
    this.addingInProgress$.subscribe((value: boolean) => {
      this.addingInProgress = value;
    });
    this.editingInProgress$.subscribe((value: boolean) => {
      this.editingInProgress = value;
    });

    this.advertForm.valueChanges.subscribe((value: any) => {
      this.advert.title = this.advertForm.get('title').value;
      this.advert.preview = this.advertForm.get('preview').value;
      this.formWithSteps.steps[0].isValid = this.advertForm.valid && this.advertForm.dirty ? true : false;
      this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid && this.advertForm.dirty ? true : false;
    });

    this.dialog.afterClosed().subscribe((value: boolean) => {
      if (this.advert.id && !value) {
        this.store.dispatch(new AdvertsDeleteAdvert(this.advert));
      }
      this.store.dispatch(new AdvertsResetNewAdvert());
      this.advertForm.reset();
    });
  }

  /**
   * Событие изменения содержимого WYSIWYG редакторп
   * @param value - Содержимое редактора
   */
  newAdvertContentChanged(value: any) {
    this.formWithSteps.steps[0].isValid = this.advertForm.valid;
    this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid;
    this.formWithSteps.steps[1].isInvalid = !this.content;
    this.formWithSteps.steps[1].isValid = this.content ? true : false;
    console.log('CONTENT', this.content);
  }

  imageSelected(files: FileList) {
    console.log(files);
    if (!this.advert.id) {
      this.store.dispatch(new AdvertsUploadImageToNewAdvert({file: files[0], header: true}));
    } else {
      this.store.dispatch(new AdvertsUploadImageToAdvert({file: files[0], header: true}));
    }
  }

  attachmentSelected(files: FileList) {
    if (this.advert.id) {
      this.store.dispatch(new AdvertsUploadAttachmentToAdvert(files));
    } else {
      this.store.dispatch(new AdvertsUploadAttachmentToNewAdvert(files));
    }
  }

  /**
   * Удаление вложения
   * @param attachment - Удаляемое вложение
   */
  attachmentRemoved(attachment: Attachment) {
    this.store.dispatch(new AdvertsDeleteAttachment(attachment));
  }

  deleteImage() {
    console.log('delete image');
  }

  /**
   * Добавление нового объявления
   */
  addAdvert() {
    console.log(this.advert);
    this.advert.content = this.content;
    this.advert.user = new User();
    this.advert.user.id = 7;
    this.advert.image = this.advert.image ?
      this.advert.image.indexOf(environment.staticUrl) !== -1 ?
        this.advert.image.substring(environment.staticUrl.length)
        : this.advert.image
      : null;
    if (!this.advert.id) {
      this.store.dispatch(new AdvertsAddAdvert(this.advert));
    } else {
      this.store.dispatch(new AdvertsEditAdvert(this.advert));
    }
    // this.dialog.close();
  }
}
