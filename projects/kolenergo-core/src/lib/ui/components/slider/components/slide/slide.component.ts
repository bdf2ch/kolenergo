import {Component, Host, Input, OnChanges, OnInit, Optional, SimpleChanges} from '@angular/core';

import { SliderComponent } from '../slider/slider.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.less']
})
export class SlideComponent implements OnInit, OnChanges {
  @Input() url: string;
  @Input() link: string;
  // @Input() size: string;
  @Input() positionY: string;
  @Input() positionX: string;
  public isActive: boolean;
  public backgroundSize: string;
  public backgroundPositionX: string;
  public backgroundPositionY: string;

  constructor(
    @Host() @Optional() private slider: SliderComponent) {
    this.isActive = false;
  }

  ngOnInit() {
    if (this.slider) {
      if (this.url) {
        this.slider.addSlide(this);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    /*
    this.backgroundSize = changes.size && changes.size.currentValue
      ? changes.size.currentValue
      : 'cover !important';
     */
    this.backgroundPositionX = changes.positionX && changes.positionX.currentValue
      ? `${changes.positionX.currentValue} !important`
      : 'center !important';
    this.backgroundPositionY = changes.positionY && changes.positionY.currentValue
      ? changes.positionY.currentValue
      : 'top !important';
    console.log(this);
  }

}
