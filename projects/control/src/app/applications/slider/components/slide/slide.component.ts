import {Component, Host, Input, OnInit, Optional} from '@angular/core';
import {SliderComponent} from '../slider/slider.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.less']
})
export class SlideComponent implements OnInit {
  @Input() url: string;
  @Input() link: string;

  constructor(@Host() @Optional() private slider: SliderComponent) {
    if (this.slider) {
      console.log('slider', this.slider);
      if (this.url) {
        this.slider.addSlide(this);
      }
    }
  }

  ngOnInit() {
  }

}
