import {Directive, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

const enum sizes {
  SMALL = 'Small',
  REGULAR = 'Regular',
  LARGE = 'Large'
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kolButton]'
})
export class KolButtonDirective implements OnChanges {
  @Input() size: sizes;
  @Input() upload: boolean;
  @HostBinding('disabled') @Input() loading: boolean;
  @Input() uploading: boolean;
  @Output() selectFile: EventEmitter<File>;
  private spinnerIcon: HTMLSpanElement;
  private uploadIcon: HTMLSpanElement;
  private fileInput: HTMLInputElement;

  constructor(private readonly element: ElementRef) {
    this.element.nativeElement.classList.add('kol-button');
    this.spinnerIcon = null;
    this.uploadIcon = null;
    this.selectFile = new EventEmitter<File>();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.element.nativeElement && changes.loading) {
      if (changes.loading.currentValue === true) {
        this.spinnerIcon = document.createElement('span');
        this.spinnerIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
        this.element.nativeElement.insertBefore(this.spinnerIcon, this.element.nativeElement.firstChild);
      } else if (changes.loading.currentValue === false && changes.loading.previousValue === true) {
        this.element.nativeElement.removeChild(this.spinnerIcon, this.element.nativeElement);
      }
    }

    if (this.element.nativeElement && changes.upload) {
      if (changes.upload.currentValue === true) {
        this.uploadIcon = document.createElement('span');
        this.uploadIcon.classList.add('fas', 'fa-cloud-upload-alt');
        this.element.nativeElement.insertBefore(this.uploadIcon, this.element.nativeElement.firstChild);
        this.fileInput = document.createElement('input');
        this.fileInput.setAttribute('type', 'file');
        this.element.nativeElement.addEventListener('click', () => {this.fileInput.click()});
        this.fileInput.addEventListener('change', (event) => {
          this.onFileSelect(event);
        });
        this.element.nativeElement.insertBefore(this.fileInput, this.element.nativeElement.firstChild);
      } else if (changes.upload.currentValue === false && changes.upload.previousValue === false) {
        this.element.nativeElement.removeChild(this.uploadIcon, this.element.nativeElement);
        this.element.nativeElement.removeChild(this.fileInput, this.element.nativeElement);
      }
    }
  }

  onFileSelect(event) {
    console.log(event);
    this.selectFile.emit(event.target.files[0]);
  }
}
