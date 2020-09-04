import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@kolenergo/core';
import { Driver, Request, RequestStatus, RoutePoint, Transport } from '../../models';
import { selectSelectedRequest } from '../../features/requests/ngrx/requests.selectors';
import { IApplicationState, selectDate, selectDrivers, selectIsLoading, selectRoutes, selectStatuses, selectTransport } from '../../ngrx';
import { RequestsEditRequest } from '../../features/requests/ngrx/requests.actions';
import { requestDurationValidator } from './request-duration.validator';

@Component({
  selector: 'app-edit-request-dialog',
  templateUrl: './edit-request-dialog.component.html',
  styleUrls: ['./edit-request-dialog.component.less']
})
export class EditRequestDialogComponent implements OnInit {
  @ViewChild('initiator', {static: true}) initiator: ElementRef;
  isLoading$: Observable<boolean>;
  selectedRequest$: Observable<Request>;
  selectedRequest: Request;
  date$: Observable<Date>;
  routes$: Observable<RoutePoint[]>;
  transport$: Observable<Transport[]>;
  drivers$: Observable<Driver[]>;
  statuses$: Observable<RequestStatus[]>;
  requestForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.selectedRequest$ = this.store.pipe(select(selectSelectedRequest));
    this.selectedRequest$.subscribe((request: Request) => {
      if (request) {
        this.selectedRequest = request.clone();
      }
    });
    this.date$ = this.store.pipe(select(selectDate));
    this.routes$ = this.store.pipe(select(selectRoutes));
    this.transport$ = this.store.pipe(select(selectTransport));
    this.drivers$ = this.store.pipe(select(selectDrivers));
    this.statuses$ = this.store.pipe(select(selectStatuses));
    this.requestForm = this.builder.group({
      initiator: new FormControl(
        this.selectedRequest.initiator
          ? this.selectedRequest.initiator instanceof User
            ? this.selectedRequest.initiator.firstName + ' ' + this.selectedRequest.initiator.lastName
            : this.selectedRequest.initiator
          : null
      ),
      user: new FormControl(this.selectedRequest.user.firstName + ' ' + this.selectedRequest.user.lastName),
      date: new FormControl(this.selectedRequest.startTimeD, Validators.required),
      startTime: new FormControl(
        moment(this.selectedRequest.startTimeD).format('HH:mm'),
        [Validators.required]
      ),
      endTime: new FormControl(
        moment(this.selectedRequest.endTimeD).format('HH:mm'),
        [Validators.required]
      ),
      description: new FormControl(this.selectedRequest.description, Validators.required),
      transport: new FormControl(this.selectedRequest.transport),
      driver: new FormControl(this.selectedRequest.driver),
      status: new FormControl(this.selectedRequest.status)
    }, {validators: [requestDurationValidator]});
  }

  ngOnInit() {
    if (this.initiator.nativeElement) {
      (this.initiator.nativeElement as HTMLInputElement).focus();
    }
  }

  /**
   * Выбор транспорта
   * @param transport - Выбранный транспорт
   */
  selectTransport(transport: Transport) {
    this.selectedRequest.transport = transport;
    this.requestForm.markAsDirty();
  }

  /**
   * Выбор водителя
   * @param driver - Выбранный водитель
   */
  selectDriver(driver: Driver) {
    this.selectedRequest.driver = driver;
    this.requestForm.markAsDirty();
  }

  /**
   * Выбор элемента маршрута
   * @param route - Элемент маршрута
   */
  selectRoute(route: RoutePoint | string) {
    this.selectedRequest.route.push(route as RoutePoint);
    this.requestForm.markAsDirty();
  }

  /**
   * Событие выбора статуса заявки
   * @param event - Собфтие
   */
  selectStatus(event: MatSelectChange) {
    this.selectedRequest.status = event.value;
  }

  /**
   * Удаление элемента маршрута
   * @param index - индекс удаляемого элемента
   */
  removeRoute(index: number) {
    this.requestForm.markAsDirty();
  }

  /**
   * Сравнение выбранной опции со значением статуса
   * @param option - Выбранная опция
   * @param value - Значение статуса
   */
  statusCompare(option: RequestStatus, value: RequestStatus): boolean {
    return option.id === value.id ? true : false;
  }

  /**
   * Созхранение изменений в заявке
   */
  editRequest() {
    console.log(this.selectedRequest);
    this.selectedRequest.startTime = moment(this.requestForm.controls.date.value)
      .hours(parseInt((this.requestForm.controls.startTime.value as string).substr(0, 2), 0))
      .minutes(parseInt((this.requestForm.controls.startTime.value as string).substr(3, 2), 0))
      .unix() * 1000;
    this.selectedRequest.endTime = moment(this.requestForm.controls.date.value)
      .hours(parseInt((this.requestForm.controls.endTime.value as string).substr(0, 2), 0))
      .minutes(parseInt((this.requestForm.controls.endTime.value as string).substr(3, 2), 0))
      .unix() * 1000;
    this.selectedRequest.description = this.requestForm.controls.description.value;
    this.store.dispatch(new RequestsEditRequest(this.selectedRequest));
  }

}
