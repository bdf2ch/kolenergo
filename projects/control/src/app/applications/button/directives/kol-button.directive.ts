import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { buttonSizes } from '../enums/buttion-sizes.enum';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[kol-button-solid]'
})
export class KolButtonDirective implements AfterViewInit, OnChanges {
  @Input() upload: boolean;
  @Input() size: string;
  @HostBinding('disabled') @Input() loading: boolean;
  @Input() progress: number;
  @Input() icon: string;
  @Output() selectFile: EventEmitter<File>;
  private content: HTMLDivElement;
  private buttonIcon: HTMLSpanElement;
  private spinnerIcon: HTMLSpanElement;
  private progressBar: HTMLDivElement;
  private fileInput: HTMLInputElement;

  constructor(private readonly element: ElementRef) {
    this.buttonIcon = null;
    this.spinnerIcon = null;
    this.progressBar = null;
    this.fileInput = null;
    this.selectFile = new EventEmitter<File>();

  }

  ngAfterViewInit(): void {
    this.element.nativeElement.classList.add('kol-button');
    this.content = document.createElement('div');
    this.content.classList.add('kol-button-content');
    this.content.innerText = this.element.nativeElement.innerText;
    this.element.nativeElement.innerText = '';
    this.element.nativeElement.appendChild(this.content);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.element.nativeElement) {
      /**
       * Установка размера кнопки
       */
      if (changes.size && changes.size.currentValue && changes.size.currentValue.length > 0) {
        switch (changes.size.currentValue) {
          case 'small':
            this.element.nativeElement.classList.toggle('small');
            break;
          case 'big':
            this.element.nativeElement.classList.toggle('big');
            break;
        }
      }

      /**
       * Добавление иконки кнопки
       */
      if (changes.icon && changes.icon.currentValue.toString().length > 0) {
        this.buttonIcon = document.createElement('span');
        this.buttonIcon.classList.add('fas', changes.icon.currentValue);
        if (this.size) {
          switch (this.size) {
            case 'small':
              this.buttonIcon.classList.toggle('fa-sm');
              break;
            case 'big':
              this.buttonIcon.classList.toggle('fa-lg');
              break;
          }
        }
        this.element.nativeElement.insertBefore(this.buttonIcon, this.element.nativeElement.firstChild);
      }

      /**
       * Добавление строки статуса загрузки
       */
      if (changes.progress && !isNaN(changes.progress.currentValue) && changes.progress.currentValue > 0) {
        if (!this.progressBar) {
          this.progressBar = document.createElement('div');
          this.progressBar.classList.add('kol-button-progress-bar');
          this.element.nativeElement.appendChild(this.progressBar);
          this.progressBar.style.width = changes.progress.currentValue + '%';
        } else {
          this.progressBar.style.width = changes.progress.currentValue + '%';
        }
      }

      /**
       * Добавление иконки загрузки
       */
      if (changes.loading) {
        if (changes.loading.currentValue === true) {
          this.spinnerIcon = document.createElement('span');
          this.spinnerIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');
          this.element.nativeElement.insertBefore(this.spinnerIcon, this.element.nativeElement.firstChild);
          if (this.buttonIcon) {
            this.buttonIcon.style.display = 'none';
          }
        } else if (changes.loading.currentValue === false && changes.loading.previousValue === true) {
          this.element.nativeElement.removeChild(this.spinnerIcon, this.element.nativeElement);
          if (this.buttonIcon) {
            this.buttonIcon.style.display = 'inline';
          }
        }
      }

      /**
       * Добавление диалога выбора файла
       */
      if (changes.upload) {
        if (changes.upload.currentValue === true) {
          this.fileInput = document.createElement('input');
          this.fileInput.setAttribute('type', 'file');
          this.element.nativeElement.addEventListener('click', () => {
            this.fileInput.click();
          });
          this.fileInput.addEventListener('change', (event) => {
            this.onFileSelect(event);
          });
          this.element.nativeElement.insertBefore(this.fileInput, this.element.nativeElement.firstChild);
        } else if (changes.upload.currentValue === false && changes.upload.previousValue === false) {
          this.element.nativeElement.removeChild(this.fileInput, this.element.nativeElement);
        }
      }
    }
  }

  /**
   * Событие выбора файла
   * @param event - Событие
   */
  onFileSelect(event) {
    console.log(event);
    this.selectFile.emit(event.target.files[0]);
  }
}
