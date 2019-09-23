import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../../../ngrx';
import { selectArticles, selectFetchingInProgress } from '../../../ngrx';
import { Article } from '../../../models';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.less']
})
export class ArticlesListComponent implements OnInit {
  public articles$: Observable<Article[]>;
  public fetchingInProgress$: Observable<boolean>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.articles$ = this.store.pipe(select(selectArticles));
    this.fetchingInProgress$ = this.store.pipe(select(selectFetchingInProgress));
  }

}
