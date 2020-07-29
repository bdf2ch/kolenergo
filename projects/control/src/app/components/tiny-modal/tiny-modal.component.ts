import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tiny-modal',
  templateUrl: './tiny-modal.component.html',
  styleUrls: ['./tiny-modal.component.less']
})
export class TinyModalComponent implements OnInit, OnChanges {
  @Input() sidebarColor: string;
  @Input() sidebarImage: string;
  @Input() sidebarTitle: string;
  @Input() sidebarTitleColor: string;
  @Input() sidebarControlTitle: string;
  @Input() sidebarControlColor: string;
  @Input() sidebarControlDisabled: boolean;
  @Output() controlAction: EventEmitter<void>;
  sidebarColorLighten: string;
  @ViewChild('sidebar', { static: true }) sidebarEl: ElementRef;
  @ViewChild('title', { static: true }) titleEl: ElementRef;
  @ViewChild('control', { static: true }) controlEl: ElementRef;

  constructor() {
    this.controlAction = new EventEmitter();
  }

  ngOnInit() {
    this.sidebarEl.nativeElement.style.background = `linear-gradient(${this.sidebarColor}, ${this.sidebarColorLighten})`;
  }

  lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] === '#') {
      col = col.slice(1);
      usePound = true;
    }
    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) {r = 255} else if  (r < 0) {r = 0;}
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) {b = 255} else if (b < 0) {b = 0;}
    let g = (num & 0x0000FF) + amt;
    if (g > 255) {g = 255;} else if (g < 0) {g = 0}
    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.sidebarColor) {
      this.sidebarColorLighten = this.lightenDarkenColor(this.sidebarColor, 60);
      this.sidebarEl.nativeElement.style.background = `linear-gradient(${changes.sidebarColor.currentValue}, ${this.sidebarColorLighten})`;
    }
    if (changes.sidebarImage) {
        this.sidebarEl.nativeElement.style.background = `url(${changes.sidebarImage.currentValue})`;
    }
    if (changes.sidebarTitleColor) {
      this.sidebarEl.nativeElement.style.background = `url(${changes.sidebarImage.currentValue})`;
    }
  }

  action() {
    this.controlAction.emit();
  }
}
