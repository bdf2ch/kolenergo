import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {IApplicationState} from '../../../ngrx';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ArticlesClearSearch, ArticlesSearchArticles} from '../../ngrx';

@Component({
  selector: 'app-articles-search',
  templateUrl: './articles-search.component.html',
  styleUrls: ['./articles-search.component.less'],
  styles: [':host { display: flex; flex-direction: row; flex: 1; }']
})
export class ArticlesSearchComponent implements OnInit {

  public query: string;
  private query$: Observable<string>;
  private query_$: BehaviorSubject<string>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.query$ = of(this.query);
    this.query_$ = new BehaviorSubject<string>(null);
  }

  ngOnInit() {
    this.query_$.asObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        filter((value: string) => value && value.length > 2),
        map((value: string) => {
          console.log('map', value);
          this.store.dispatch(new ArticlesSearchArticles(value));
        })
      ).subscribe();
  }

  queryChange(value: string) {
    this.query_$.next(value);
  }

  clearSearch() {
    this.query = null;
    this.store.dispatch(new ArticlesClearSearch());
  }
}
