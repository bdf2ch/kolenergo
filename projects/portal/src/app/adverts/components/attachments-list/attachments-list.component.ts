import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Attachment } from '../../../portal/models';

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
  @Input() showCaptionIfNoAttachments: boolean;
  @Input() showNoAttachmentsPlaceholder: boolean;
  @Input() uploadingInProgress: boolean;
  @Input() removingInProgress: boolean;
  @Output() select: EventEmitter<FileList>;
  @Output() remove: EventEmitter<Attachment>;
  public attachmentsList: Attachment[];

  constructor() {
    this.select = new EventEmitter<FileList>();
    this.remove = new EventEmitter<Attachment>();
    this.attachmentsList = [];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('attachments')) {
      this.attachmentsList = changes.attachments.currentValue ? changes.attachments.currentValue : [];
    }
  }

  /**
   * Выбор файла для загрузки
   * @param files - Список файлов
   */
  onSelectFile(files: FileList) {
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
