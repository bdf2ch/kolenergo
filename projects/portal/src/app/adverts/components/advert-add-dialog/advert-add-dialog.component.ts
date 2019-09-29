import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialogRef } from '@angular/material';
import { MatSelectChange } from '@angular/material/select';


import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/ru';

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
  selectUploadingAttachmentInProgress,
  selectDeletingAttachmentInProgress,
  selectAddingInProgress,
  selectEditingInProgress, selectTemplates
} from '../../ngrx';
import { Attachment } from '../../../portal/models';
import { AdvertImageUploadAdapter } from './image-upload-adapter.class';
import { AdvertsService } from '../../services/adverts.service';
import { environment } from '../../../../environments/environment';

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
  public advert: Advert;
  public templates$: Observable<Advert[]>;
  public addingInProgress$: Observable<boolean>;
  public editingInProgress$: Observable<boolean>;
  public uploadingImageInProgress$: Observable<boolean>;
  public uploadingAttachmentInProgress$: Observable<boolean>;
  public deletingImageInProgress$: Observable<boolean>;
  public deletingAttachmentInProgress$: Observable<boolean>;

  public content: string;
  public Editor = DecoupledEditor;
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
              private readonly dialog: MatDialogRef<AdvertAddDialogComponent>,
              private readonly adverts: AdvertsService) {
    this.advert = new Advert();
    this.formWithSteps = new FormStepManager();
    this.formWithSteps.addStep(new FormStep('Атрибуты', 'Заголовок и прочее', 'info'));
    this.formWithSteps.addStep(new FormStep('Изображение', 'Загрузка изображения', 'insert_photo'));
    this.formWithSteps.addStep(new FormStep('Содержание', 'Содержание объявления', 'notes'));
    this.formWithSteps.addStep(new FormStep('Вложения', 'Прикрепленные файлы', 'attach_file'));
    // this.attachments = [];
    this.content = '';
  }

  ngOnInit() {
    this.advert$ = this.store.pipe(select(selectNewAdvert));
    this.templates$ = this.store.pipe(select(selectTemplates));
    this.addingInProgress$ = this.store.pipe(select(selectAddingInProgress));
    this.editingInProgress$ = this.store.pipe(select(selectEditingInProgress));
    this.uploadingImageInProgress$ = this.store.pipe(select(selectUploadingImageInProgress));
    this.uploadingAttachmentInProgress$ = this.store.pipe(select(selectUploadingAttachmentInProgress));
    this.deletingImageInProgress$ = this.store.pipe(select(selectDeletingImageInProgress));
    this.deletingAttachmentInProgress$ = this.store.pipe(select(selectDeletingAttachmentInProgress));
    this.advertForm = this.builder.group({
      template: new FormControl(null),
      title: new FormControl(this.advert.title, Validators.required),
      preview: new FormControl(this.advert.preview),
      date: new FormControl(null),
      isTemplate: new FormControl(false)
    });
    this.advert$.subscribe((advert: Advert) => {
      this.advert = advert;
      this.advertForm.get('title').setValue(advert.title);
      this.advertForm.get('preview').setValue(advert.preview);
      console.log('advert changes', advert);
      console.log(this.advertForm.getRawValue());
    });
    this.templates$.subscribe((value: Advert[]) => {
      if (value.length === 0) {
        this.advertForm.get('template').disable();
      } else {
        this.advertForm.get('template').enable();
      }
    });

    /**
     * Событие изменения значений полей формы добавления нового объявления
     */
    this.advertForm.valueChanges.subscribe((value: any) => {
      this.advert.title = value.title;
      this.advert.preview = value.preview;
      this.advert.dateCreated = value.date ? (value.date as Date).getTime() : 0;
      this.advert.isTemplate = value.isTemplate;

      this.formWithSteps.steps[0].isValid =
        !value.template && this.advertForm.valid && this.advertForm.dirty
          ? true : value.template && this.advertForm.valid
            ? true : false;
      this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid;
      this.advertForm.reset({
        template: this.advert.template,
        title: this.advert.title,
        preview: this.advert.preview
      }, {emitEvent: false});
      console.log('form state', this.advertForm.status);
    });

    /**
     * Событие закрытия диалогового окна добавления нового объявления
     */
    this.dialog.afterClosed().subscribe((value: boolean) => {
      if (this.advert.id && !value) {
        this.store.dispatch(new AdvertsDeleteAdvert(this.advert));
      }
      this.store.dispatch(new AdvertsResetNewAdvert());
      this.advertForm.reset();
    });
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  /**
   * Собыьие выбора шаблона объявления
   * @param event - Событие выбора
   */
  advertTemplateSelect(event: MatSelectChange) {
    this.advert.template = event.value;
    this.advert.title = (event.value as Advert).title;
    this.advert.preview = (event.value as Advert).preview;
    this.advert.markup = (event.value as Advert).markup;
    this.content = (event.value as Advert).markup;
    this.advert.attachments = (event.value as Advert).attachments;
    if ((event.value as Advert).image) {
      this.advert.changeImage((event.value as Advert).image);
    }
    this.advertForm.get('title').setValue(this.advert.title);
    this.advertForm.get('preview').setValue(this.advert.preview);
  }

  /**
   * Событие изменения содержимого WYSIWYG редакторп
   * @param value - Содержимое редактора
   */
  advertContentChanged(value: any) {
    // this.formWithSteps.steps[0].isValid = this.advertForm.valid;
    // this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid;
    this.formWithSteps.steps[0].isValid =
      !this.advert.template && this.advertForm.valid && this.advertForm.dirty
        ? true : this.advert.template && this.advertForm.valid
        ? true : false;
    this.formWithSteps.steps[0].isInvalid = this.advertForm.invalid;
    this.formWithSteps.steps[1].isInvalid = !this.content;
    this.formWithSteps.steps[1].isValid = this.content ? true : false;
    console.log('CONTENT', this.content);
  }

  /**
   * Событие выбора изображения
   * @param files - Выбранное изображение
   */
  imageSelected(files: FileList) {
    this.store.dispatch(!this.advert.id
      ? new AdvertsUploadImageToNewAdvert({file: files[0], header: true})
      : new AdvertsUploadImageToAdvert({file: files[0], header: true}));
  }

  /**
   * Событие выбора вложения
   * @param files - Выбранный файл
   */
  attachmentSelected(files: FileList) {
    this.store.dispatch(this.advert.id
      ? new AdvertsUploadAttachmentToAdvert(files)
      : new AdvertsUploadAttachmentToNewAdvert(files));
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
    this.advert.markup = this.content;
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
  }
}
