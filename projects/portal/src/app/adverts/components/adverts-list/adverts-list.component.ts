import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Advert } from '../../models';
import { IApplicationState, selectAdvertsOnStartPageCount, selectTotalAdvertsCount } from '../../../ngrx';
import {
  AdvertsLoadAdvertsNextPage,
  selectAdverts,
  selectPage,
  selectTotalAdverts,
  selectTotalPages,
  selectFetchingInProgress,
  selectSearchQuery, selectSearchingInProgress,
} from '../../ngrx';
import { AdvertAddDialogComponent } from '../advert-add-dialog/advert-add-dialog.component';

@Component({
  selector: 'app-adverts-list',
  templateUrl: './adverts-list.component.html',
  styleUrls: ['./adverts-list.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; height: 100%; }']
})
export class AdvertsListComponent implements OnInit {
  public adverts$: Observable<Advert[]>;
  private advertsOnPage$: Observable<number>;
  public totalAdverts$: Observable<number>;
  public page$: Observable<number>;
  public totalPages$: Observable<number>;
  public fetchingInProgress$: Observable<boolean>;
  public searchingInProgress$: Observable<boolean>;
  public advertsOnPage: number;
  public totalAdverts: number;
  public searchQuery$: Observable<string>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog) {}

  ngOnInit() {
    this.adverts$ = this.store.pipe(select(selectAdverts));
    this.advertsOnPage$ = this.store.pipe(select(selectAdvertsOnStartPageCount));
    this.totalAdverts$ = this.store.pipe(select(selectTotalAdverts));
    this.page$ = this.store.pipe(select(selectPage));
    this.totalPages$ = this.store.pipe(select(selectTotalPages));
    this.totalAdverts$ = this.store.pipe(select(selectTotalAdvertsCount));
    this.fetchingInProgress$ = this.store.pipe(select(selectFetchingInProgress));
    this.searchingInProgress$ = this.store.pipe(select(selectSearchingInProgress));
    this.searchQuery$ = this.store.pipe(select(selectSearchQuery));

    this.advertsOnPage$.subscribe((value: number) => {
      this.advertsOnPage = value;
    });
    this.totalAdverts$.subscribe((value: number) => {
      this.totalAdverts = value;
    });
  }

  openAddAdvertDialog() {
    this.dialog.open(AdvertAddDialogComponent, {
      id: 'add-advert-dialog',
      width: '900px',
      minHeight: '650px',
      panelClass: 'add-advert-dialog'
    });
  }

  loadAdvertsNextPAge() {
    this.store.dispatch(new AdvertsLoadAdvertsNextPage());
  }

}
