import { Component, OnInit } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  public slides: SlideComponent[];
  public images: HTMLImageElement[];

  constructor() {
    this.slides = [];
    this.images = [];
  }

  ngOnInit() {
  }

  addSlide(slide: SlideComponent) {
    const image: HTMLImageElement = document.createElement('image') as HTMLImageElement;
    image.src = slide.url;
    image.onload = () => {
      console.log(slide.url, ' loaded successfully');
    };
    this.images.push(image);
    this.slides.push(slide);
  }
}
