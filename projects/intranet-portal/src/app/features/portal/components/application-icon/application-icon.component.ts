import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-application-icon',
  templateUrl: './application-icon.component.html',
  styleUrls: ['./application-icon.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationIconComponent implements OnInit, OnChanges {
  @Input() color: string;
  @Input() label: string;
  @Input() imageUrl: string;
  @Input() indicator: string;
  @ViewChild('icon', { static: true }) icon: ElementRef;
  @ViewChild('image', { static: true }) image: ElementRef;
  public colorHover: string;
  public colorLighten: string;
  public colorLightenHover: string;

  constructor() { }

  ngOnInit() {
    if (this.icon.nativeElement) {
        this.icon.nativeElement.style.background = `linear-gradient(${this.color}, ${this.colorLighten})`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color) {
      this.colorHover = this.LightenDarkenColor(this.color, -30);
      this.colorLighten = this.LightenDarkenColor(this.color, 60);
      this.colorLightenHover = this.LightenDarkenColor(this.color, 40);

      if (this.icon.nativeElement) {
        this.icon.nativeElement.style.background = `linear-gradient(${this.color}, ${this.colorLighten})`;
      }
    }
    if (changes.imageUrl) {
      if (this.image.nativeElement) {
        this.image.nativeElement.style.background = `url(${changes.imageUrl.currentValue})`;
      }
    }
  }

  LightenDarkenColor(col, amt) {
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

  hover(isActive: boolean) {
    console.log('hover', isActive);
    console.log('color hover', this.colorHover, 'lightenHover', this.colorLightenHover);
    if (this.icon.nativeElement) {
      if (isActive) {
        this.icon.nativeElement.style.background = `linear-gradient(${this.colorHover}, ${this.colorLightenHover})`;
      } else {
        this.icon.nativeElement.style.background = `linear-gradient(${this.color}, ${this.colorLighten})`;
      }
    }
  }

}
