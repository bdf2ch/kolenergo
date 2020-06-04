import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-application-icon',
  templateUrl: './application-icon.component.html',
  styleUrls: ['./application-icon.component.less']
})
export class ApplicationIconComponent implements OnInit, OnChanges {
  @Input() color: string;
  @Input() label: string;
  @Input() indicator: string;
  public colorLighten: string;
  public colorDarken: string;

  constructor() { }

  ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.color) {
      this.colorLighten = this.LightenDarkenColor(this.color, 60);
      this.colorDarken = this.LightenDarkenColor(this.color, -50);
    }
  }

}
