import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import {select, Store} from '@ngrx/store';

import { User } from 'kolenergo-core';
import { Advert } from '../../../adverts/models';
import {
  IApplicationState,
  LoadAdvertsNextPage,
  LoadAdvertsPreviousPage,
  selectAdvertsOnStartPage, selectAdvertsIsFetching,
  selectAdvertsOnStartPageCount,
  selectTotalAdvertsCount
} from '../../../ngrx';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  public adverts$: Observable<Advert[]>;
  private advertsOnPage$: Observable<number>;
  public totalAdverts$: Observable<number>;
  public advertsIsFetching$: Observable<boolean>;
  public advertsOnPage: number;
  public totalAdverts: number;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.adverts$ = this.store.pipe(select(selectAdvertsOnStartPage));
    this.advertsOnPage$ = this.store.pipe(select(selectAdvertsOnStartPageCount));
    this.totalAdverts$ = this.store.pipe(select(selectTotalAdvertsCount));
    this.advertsIsFetching$ = this.store.pipe(select(selectAdvertsIsFetching));

    this.advertsOnPage$.subscribe((value: number) => {
      this.advertsOnPage = value;
    });
    this.totalAdverts$.subscribe((value: number) => {
      this.totalAdverts = value;
    });
  }

  /**
   * Загрузка предыдущей страницы с объявлениями
   * @param page - Порядковый номер загружаемой страницы
   */
  loadAdvertsPreviousPage(page: number) {
    this.store.dispatch(new LoadAdvertsPreviousPage({page: page - 1, advertsOnPage: this.advertsOnPage}));
  }

  /**
   * Загрузка следующей страницы с объявлениями
   * @param page - Порядковый номер загружаемой страницы
   */
  loadAdvertsNextPage(page: number) {
    this.store.dispatch(new LoadAdvertsNextPage({page: page - 1, advertsOnPage: this.advertsOnPage}));
  }


}
