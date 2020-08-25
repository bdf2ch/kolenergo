import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { User } from '@kolenergo/core';
import { IApplicationState } from '../../ngrx/application.state';
import { selectDate, selectIsLoading, selectRoutes } from '../../ngrx/selectors';
import { Request, RoutePoint } from '../../models';
import { RequestsAddRequest } from '../../features/requests/ngrx';
import { endTime } from './end-time.validator';
import { minTime } from './time.validator';

@Component({
  selector: 'app-add-request-dialog',
  templateUrl: './add-request-dialog.component.html',
  styleUrls: ['./add-request-dialog.component.less']
})
export class AddRequestDialogComponent implements OnInit {
  isLoading$: Observable<boolean>;
  date$: Observable<Date>;
  date: Date;
  routes$: Observable<RoutePoint[]>;
  request: Request;
  routes: RoutePoint[];
  addRequestForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.date$ = this.store.pipe(select(selectDate));
    this.date$.subscribe((value: Date) => {
      this.date = value;
    });
    this.routes$ = this.store.pipe(select(selectRoutes));
    this.request = new Request();
    this.routes = [];
    const minutes = moment().add(15, 'minutes').minutes();
    this.request.startTimeD = moment()
      .add(15, 'minutes')
      .minutes(minutes % 10 ? minutes + 10 - minutes % 10 : minutes)
      .toDate();
    this.request.endTimeD = moment(this.request.startTimeD)
      .add(1, 'hours')
      .toDate();
    this.addRequestForm = this.builder.group({
      initiator: new FormControl(null),
      date: new FormControl(this.date, Validators.required),
      startTime: new FormControl(
        moment(this.request.startTimeD).format('HH:mm'),
        [Validators.required, minTime(this.date)]
      ),
      endTime: new FormControl(
        moment(this.request.endTimeD).format('HH:mm'),
        [Validators.required, endTime(this.date, moment(this.request.startTimeD).format('HH:mm'))]
      ),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  /**
   * Выбор инициатора заявки
   * @param user - Пользователь
   */
  selectInitiator(user: User | string) {
    this.request.initiator = user;
    console.log(this.request);
  }

  /**
   * Удаление инициатора заявки
   */
  clearInitiator() {
    this.request.initiator = null;
    console.log(this.request);
  }

  /**
   * Выбор элемента маршрута
   * @param route - Элемент маршрута
   */
  selectRoute(route: RoutePoint | string) {
    this.request.route.push(route as RoutePoint);
  }

  /**
   * Добавление новой заявки
   */
  addRequest() {
    this.request.startTime = moment(this.addRequestForm.controls.date.value)
      .hours(parseInt((this.addRequestForm.controls.startTime.value as string).substr(0, 2), 0))
      .minutes(parseInt((this.addRequestForm.controls.startTime.value as string).substr(3, 2), 0))
      .unix() * 1000;
    this.request.endTime = moment(this.date)
      .hours(parseInt((this.addRequestForm.controls.endTime.value as string).substr(0, 2), 0))
      .minutes(parseInt((this.addRequestForm.controls.endTime.value as string).substr(3, 2), 0))
      .unix() * 1000;
    this.request.description = this.addRequestForm.controls.description.value;
    console.log(this.request);
    this.store.dispatch(new RequestsAddRequest(this.request));
  }
}
