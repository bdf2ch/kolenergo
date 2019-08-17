import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { Store } from '@ngrx/store';

import { Attachment } from '../../../portal/models';
import { IApplicationState } from '../../../ngrx';

@Component({
  selector: 'app-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.less']
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

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('attachments') && changes.attachments.currentValue) {
      this.attachmentsList = changes.attachments.currentValue;
    }
  }

  onSelectFile(files: FileList) {
    console.log(files);
  }

  onRemoveAttachment(attachment: Attachment) {}

}
