import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Advert} from '../../models';
import {select, Store} from '@ngrx/store';
import {IApplicationState, selectAdvertsOnStartPage, selectAdvertsIsFetching, selectAdvertsOnStartPageCount, selectTotalAdvertsCount} from '../../../ngrx';
import {selectAdverts} from '../../ngrx';
import {MatDialog} from '@angular/material';
import {NewAdvertComponent} from '../new-advert/new-advert.component';

@Component({
  selector: 'app-adverts-list',
  templateUrl: './adverts-list.component.html',
  styleUrls: ['./adverts-list.component.less']
})
export class AdvertsListComponent implements OnInit {
  public adverts$: Observable<Advert[]>;
  private advertsOnPage$: Observable<number>;
  public totalAdverts$: Observable<number>;
  public advertsIsFetching$: Observable<boolean>;
  public advertsOnPage: number;
  public totalAdverts: number;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog) {}

  ngOnInit() {
    this.adverts$ = this.store.pipe(select(selectAdverts));
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

  openAddAdvertDialog() {
    this.dialog.open(NewAdvertComponent, {
      width: '900px',
      minHeight: '650px',
      panelClass: 'add-advert-dialog'
    });
  }

}
