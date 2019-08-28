import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent}  from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';

import { AuthenticationSignOut, User } from '@kolenergo/core';
import { IApplicationState, selectCurrentUser } from '../../../ngrx';
import {LoadReportsByDate, selectDate, selectFetchingInProgress, selectSelectedDate} from '../../ngrx';

@Component({
  selector: 'app-press-reports',
  templateUrl: './press-reports.component.html',
  styleUrls: ['./press-reports.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class PressReportsComponent implements OnInit {
  public user$: Observable<User>;
  public currentDate$: Observable<Date>;
  public selectedDate$: Observable<Date>;
  public isFetchingInProgress$: Observable<boolean>;
  public user: User;
  public seletedDate: Date;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.currentDate$ = this.store.pipe(select(selectDate));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.isFetchingInProgress$ = this.store.pipe(select(selectFetchingInProgress));
    this.user$.subscribe((value: User) => {
      this.user = value;
    });
    this.selectedDate$.subscribe((value: Date) => {
      this.seletedDate = value;
    });
  }

  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

  dateChanged(event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value).format('DD.MM.YYYY'));
    this.store.dispatch(new LoadReportsByDate(moment(event.value).format('DD.MM.YYYY')));
  }

}
