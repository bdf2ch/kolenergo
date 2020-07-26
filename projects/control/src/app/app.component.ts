import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationLoadInitialData, IApplicationState, selectLoading } from './ngrx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'control';
  isLoading$: Observable<boolean>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isLoading$ = this.store.pipe(select(selectLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new ApplicationLoadInitialData());
  }
}
