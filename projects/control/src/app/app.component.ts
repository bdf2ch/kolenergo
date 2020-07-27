import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationLoadInitialData, IApplicationState, selectLoading, selectMenu } from './ngrx';
import { Application, MenuItem } from './models';
import { selectSelectedApplication } from './features/applications/ngrx';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean>;
  menu$: Observable<MenuItem[]>;
  selectedApplication$: Observable<Application>;
  sectionTitle: string;
  sectionSubtitle: string;

  constructor(private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly location: Location,
              private readonly store: Store<IApplicationState>) {
    this.isLoading$ = this.store.pipe(select(selectLoading));
    this.menu$ = this.store.pipe(select(selectMenu));
    this.selectedApplication$ = this.store.pipe(select(selectSelectedApplication));
    this.route.data.subscribe((data: {title}) => {
      this.sectionTitle = data.title;
    });
    //this.sectionTitle = history.state.title;
    //this.sectionSubtitle = history.state.subtitle;

    // console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    this.store.dispatch(new ApplicationLoadInitialData());
    console.log(history.state);
    console.log(this.location.getState());
  }
}
