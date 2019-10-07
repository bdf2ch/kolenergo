import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('slidesContainer') slidesContainer: ElementRef;

  constructor() {
    this.slides = [];
    this.images = [];
  }

  ngOnInit() {

  }

  addSlide(slide: SlideComponent) {
    const image: HTMLImageElement = document.createElement('img') as HTMLImageElement;
    image.setAttribute('src', slide.url);
    image.addEventListener('onload', () => {console.log(slide.url, ' loaded successfully');});
    //image.src = slide.url;
    image.onload = () => {
      console.log(slide.url, ' loaded successfully');
    };
    this.slidesContainer.nativeElement.appendChild(image);
    console.log(image);
    this.images.push(image);
    this.slides.push(slide);
  }
}
