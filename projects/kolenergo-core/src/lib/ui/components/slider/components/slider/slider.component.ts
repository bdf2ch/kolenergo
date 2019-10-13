import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { SlideComponent } from '../slide/slide.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: '1' })),
      state('out', style({ opacity: '0' })),
      transition('* <=> *', [
        animate(3000)
      ])
    ])
  ]
})
export class SliderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() interval: number;
  @Input() showControls: boolean;
  public slides: SlideComponent[];
  public currentSlide: SlideComponent;
  private changeInterval;

  constructor() {
    this.slides = [];
    this.currentSlide = null;
  }

  ngOnInit() {
    this.changeInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval * 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.interval = changes.interval && changes.interval.currentValue ? changes.interval.currentValue : 30;
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  /**
   * Добавление слайда в коллекуию
   * @param slide - Добавляемый слайд
   */
  addSlide(slide: SlideComponent) {
    console.log(slide);
    this.slides.push(slide);
    if (!this.currentSlide) {
      slide.isActive = true;
      this.currentSlide = slide;
    }
  }

  /**
   * Показ следующего слайда
   */
  nextSlide() {
    const index = this.slides.indexOf(this.currentSlide);
    this.currentSlide = this.slides[index + 1] ? this.slides[index + 1] : this.slides[0];
    this.slides.forEach((item: SlideComponent, itemIndex: number) => {
      item.isActive = itemIndex === index;
    });
  }

  /**
   * Выбор слайда
   * @param slide - Выбранный слайд
   */
  selectSlide(slide: SlideComponent) {
    this.slides.forEach((item: SlideComponent) => {
      if (item === slide) {
        item.isActive = true;
        this.currentSlide = item;
      } else {
        item.isActive = false;
      }
    });
  }
}
