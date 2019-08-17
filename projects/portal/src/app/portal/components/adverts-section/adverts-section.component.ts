import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Advert } from '../../../adverts/models';

@Component({
  selector: 'app-adverts-section',
  templateUrl: './adverts-section.component.html',
  styleUrls: ['./adverts-section.component.less']
})
export class AdvertsSectionComponent implements OnInit, OnChanges {
  @Input() adverts: Advert[];
  @Input() count: number;
  @Input() totalAdvertsCount: number;
  @Input() fetchingInProgress: boolean;
  @Output() previousAdverts: EventEmitter<number> = new EventEmitter();
  @Output() nextAdverts: EventEmitter<number> = new EventEmitter();
  public step: number;
  public totalSteps: number;
  public advertCounter: number;
  public totalAdverts: number;
  public isFetching: boolean;
  public currentAdverts: Advert[];


  constructor() {
    this.step = 1;
    this.totalSteps = 1;
    this.advertCounter = 3;
    this.totalAdverts = 0;
    this.isFetching = false;
    this.currentAdverts = [];
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.counter && changes.counter.currentValue) {
      this.advertCounter = changes.counter.currentValue;
    }
    if (changes.totalAdvertsCount && changes.totalAdvertsCount.currentValue) {
      this.totalAdverts = changes.totalAdvertsCount.currentValue;
    }
    if (changes.fetchingInProgress && changes.fetchingInProgress.currentValue !== null) {
      this.isFetching = changes.fetchingInProgress.currentValue;
    }
    if (changes.adverts && (changes.adverts.currentValue as Advert[]).length > 0) {
      this.currentAdverts = changes.adverts.currentValue;
      this.totalSteps = Math.ceil(this.totalAdverts / this.advertCounter);
    }
  }

  /**
   * Переход к предыдущей странице с объявлениями
   */
  previous() {
    if (this.step - 1 > 0) {
      this.step--;
      this.previousAdverts.emit(this.step);
    }
  }

  /**
   * Переход к следующей странице с объявлениями
   */
  next() {
    if (this.step + 1 <= this.totalSteps) {
      this.step++;
      this.nextAdverts.emit(this.step);
    }
  }
}
