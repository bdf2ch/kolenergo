import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {IApplicationState} from '../../../ngrx';
import {AdvertsClearSearch, AdvertsSearchAdverts} from '../../ngrx';

@Component({
  selector: 'app-adverts-search',
  templateUrl: './adverts-search.component.html',
  styleUrls: ['./adverts-search.component.less'],
  styles: [':host { display: flex; flex-direction: row; flex: 1; }']
})
export class AdvertsSearchComponent implements OnInit {
  public query: string;
  public advertSearchForm: FormGroup;
  private query$: Observable<string>;
  private query_$: BehaviorSubject<string>;

  constructor(private readonly builder: FormBuilder,
              private readonly store: Store<IApplicationState>) {
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
          this.store.dispatch(new AdvertsSearchAdverts(value));
        })
      ).subscribe();
  }

  queryChange(value: string) {
    // console.log(value);
    this.query_$.next(value);
  }

  clearSearch() {
    this.query = null;
    this.store.dispatch(new AdvertsClearSearch());
  }

}
