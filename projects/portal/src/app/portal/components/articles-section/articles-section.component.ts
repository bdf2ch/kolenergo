import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Article } from '../../../articles/models';
import {Advert} from '../../../adverts/models';

@Component({
  selector: 'app-articles-section',
  templateUrl: './articles-section.component.html',
  styleUrls: ['./articles-section.component.less']
})
export class ArticlesSectionComponent implements OnInit {
  @Input() caption: string;
  @Input() articles: Article[];
  @Input() count: number;
  @Input() totalArticlesCount: number;
  @Input() fetchingInProgress: boolean;
  @Output() previousArticles: EventEmitter<number> = new EventEmitter();
  @Output() nextArticles: EventEmitter<number> = new EventEmitter();
  public step: number;
  public totalSteps: number;
  public articlesCounter: number;
  public totalArticles: number;
  public isFetching: boolean;
  public currentArticles: Article[];

  constructor() {
    this.step = 1;
    this.totalSteps = 1;
    this.articlesCounter = 3;
    this.totalArticles = 0;
    this.isFetching = false;
    this.currentArticles = [];
  }

  ngOnInit() {}

  /**
   * Переход к предыдущей странице со статьями
   */
  previous() {
    if (this.step - 1 > 0) {
      this.step--;
      this.previousArticles.emit(this.step);
    }
  }

  /**
   * Переход к следующей странице со статьями
   */
  next() {
    if (this.step + 1 <= this.totalSteps) {
      this.step++;
      this.nextArticles.emit(this.step);
    }
  }
}
