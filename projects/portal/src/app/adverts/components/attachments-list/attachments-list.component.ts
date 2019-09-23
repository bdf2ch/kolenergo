import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';

import { Attachment } from '../../../portal/models';
import { IApplicationState } from '../../../ngrx';

@Component({
  selector: 'app-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class AttachmentsListComponent implements OnInit, OnChanges {
  @Input() attachments: Attachment[];
  @Input() allowUpload: boolean;
  @Input() allowDelete: boolean;
  @Input() caption: string;
  @Input() uploadingInProgress: boolean;
  @Input() removingInProgress: boolean;
  @Output() select: EventEmitter<FileList>;
  @Output() remove: EventEmitter<Attachment>;
  public attachmentsList: Attachment[];

  constructor(private readonly store: Store<IApplicationState>) {
    this.select = new EventEmitter<FileList>();
    this.remove = new EventEmitter<Attachment>();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    if (changes.hasOwnProperty('attachments')) {
      console.log(changes.attachments);
      this.attachmentsList = changes.attachments.currentValue;
      console.log('attachments list', this.attachmentsList);
    }
  }

  /**
   * Выбор файла для загрузки
   * @param files - Список файлов
   */
  onSelectFile(files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      this.select.emit(files);
    }
  }

  /**
   * Удаление вложения
   * @param attachment - Удаляемое вложение
   */
  onRemoveAttachment(attachment: Attachment) {
    this.remove.emit(attachment);
  }

}
