import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, selectBreadcrumb, selectLoading, selectMenu } from './ngrx';
import {Application, Menu, MenuItem} from './models';
import { selectSelectedApplication } from './features/applications/ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  menu$: Observable<Menu>;
  breadcrumb$: Observable<MenuItem[]>;
  selectedApplication$: Observable<Application>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.menu$ = this.store.pipe(select(selectMenu));
    this.breadcrumb$ = this.store.pipe(select(selectBreadcrumb));
    this.selectedApplication$ = this.store.pipe(select(selectSelectedApplication));
  }

  ngOnInit(): void {}
}
