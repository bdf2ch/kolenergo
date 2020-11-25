import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material';

import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@kolenergo/core';
import { Driver, RejectReason, Request, RequestStatus, RoutePoint, Transport } from '../../models';
import { selectSelectedRequest } from '../../features/requests/ngrx/requests.selectors';
import {
  IApplicationState,
  selectDate,
  selectDrivers,
  selectIsLoading,
  selectRejectReasons,
  selectRoutes,
  selectStatuses,
  selectTransport,
  selectAvailableTransport, selectAvailableDrivers
} from '../../ngrx';
import { RequestsEditRequest, LoadBusy } from '../../features/requests/ngrx/requests.actions';
import { requestDurationValidator } from './request-duration.validator';
import { TransportTypeaheadComponent } from '../transport-typeahead/transport-typeahead.component';
import { DriverTypeaheadComponent } from '../driver-typeahead/driver-typeahead.component';

@Component({
  selector: 'app-edit-request-dialog',
  templateUrl: './edit-request-dialog.component.html',
  styleUrls: ['./edit-request-dialog.component.less']
})
export class EditRequestDialogComponent implements OnInit {
  @ViewChild('initiator', {static: true}) initiator: ElementRef;
  @ViewChild('transport', {static: true}) transport: TransportTypeaheadComponent;
  @ViewChild('driver', {static: true}) driver: DriverTypeaheadComponent;
  isLoading$: Observable<boolean>;
  selectedRequest$: Observable<Request>;
  selectedRequest: Request;
  date$: Observable<Date>;
  routes$: Observable<RoutePoint[]>;
  transport$: Observable<Transport[]>;
  drivers$: Observable<Driver[]>;
  statuses$: Observable<RequestStatus[]>;
  rejectReasons$: Observable<RejectReason[]>;
  availableTransport$: Observable<Transport[]>;
  availableDrivers$: Observable<Driver[]>;
  requestForm: FormGroup;
  initiatorPosition: string;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.selectedRequest$ = this.store.pipe(select(selectSelectedRequest));
    this.selectedRequest$.subscribe((request: Request) => {
      if (request) {
        this.selectedRequest = request.clone();
        this.initiatorPosition = request.initiator instanceof User ? request.initiator.position : null;
      }
    });
    this.date$ = this.store.pipe(select(selectDate));
    this.routes$ = this.store.pipe(select(selectRoutes));
    this.transport$ = this.store.pipe(select(selectTransport));
    this.drivers$ = this.store.pipe(select(selectDrivers));
    this.statuses$ = this.store.pipe(select(selectStatuses));
    this.rejectReasons$ = this.store.pipe(select(selectRejectReasons));
    this.availableTransport$ = this.store.pipe(select(selectAvailableTransport));
    this.availableDrivers$ = this.store.pipe(select(selectAvailableDrivers));
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
      status: new FormControl(this.selectedRequest.status),
      rejectReason: new FormControl(this.selectedRequest.rejectReason)
    }, {validators: [requestDurationValidator]});

    this.requestForm.controls.startTime.valueChanges.subscribe((value: string) => {
      if (value) {
        this.store.dispatch(
          new LoadBusy({
            requestId: this.selectedRequest.id,
            startTime:
              moment(this.requestForm.controls.date.value)
                .hours(parseInt((this.requestForm.controls.startTime.value as string).substr(0, 2), 0))
                .minutes(parseInt((this.requestForm.controls.startTime.value as string).substr(3, 2), 0))
                .unix() * 1000,
            endTime:
              moment(this.requestForm.controls.date.value)
                .hours(parseInt((this.requestForm.controls.endTime.value as string).substr(0, 2), 0))
                .minutes(parseInt((this.requestForm.controls.endTime.value as string).substr(3, 2), 0))
                .unix() * 1000
            }
          )
        );
      }
    });

    this.requestForm.controls.endTime.valueChanges.subscribe((value: string) => {
      if (value) {
        this.store.dispatch(
          new LoadBusy({
              requestId: this.selectedRequest.id,
              startTime:
                moment(this.requestForm.controls.date.value)
                  .hours(parseInt((this.requestForm.controls.startTime.value as string).substr(0, 2), 0))
                  .minutes(parseInt((this.requestForm.controls.startTime.value as string).substr(3, 2), 0))
                  .unix() * 1000,
              endTime:
                moment(this.requestForm.controls.date.value)
                  .hours(parseInt((this.requestForm.controls.endTime.value as string).substr(0, 2), 0))
                  .minutes(parseInt((this.requestForm.controls.endTime.value as string).substr(3, 2), 0))
                  .unix() * 1000
            }
          )
        );
      }
    });
  }

  ngOnInit() {
    this.store.dispatch(new LoadBusy({
      requestId: this.selectedRequest.id,
      startTime:
        moment(this.requestForm.controls.date.value)
        .hours(parseInt((this.requestForm.controls.startTime.value as string).substr(0, 2), 0))
        .minutes(parseInt((this.requestForm.controls.startTime.value as string).substr(3, 2), 0))
        .unix() * 1000,
      endTime:
        moment(this.requestForm.controls.date.value)
        .hours(parseInt((this.requestForm.controls.endTime.value as string).substr(0, 2), 0))
        .minutes(parseInt((this.requestForm.controls.endTime.value as string).substr(3, 2), 0))
        .unix() * 1000
    }));
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
   * Сброс транспорта
   */
  clearTransport() {
    console.log('transport cleared');
    console.log(this.transport.transportForm.status);
    this.selectedRequest.transport = null;
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
   * Сброс водителя
   */
  clearDriver() {
    this.selectedRequest.driver = null;
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
   * @param event - Событие
   */
  selectStatus(event: MatSelectChange) {
    this.selectedRequest.status = event.value;
    if (event.value.id !== 3) {
      this.requestForm.controls.rejectReason.setValue(null);
      this.selectedRequest.rejectReason = null;
    }
  }

  /**
   * Событие выбора причины отклонения заявки
   * @param event - Событие
   */
  selectRejectReason(event: MatSelectChange) {
    this.selectedRequest.rejectReason = event.value;
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
   * Сравнение выбранной опции со значением причины отклонения
   * @param option - Выбранная опция
   * @param value - Значение статуса
   */
  reasonStatusCompare(option: RejectReason, value: RejectReason): boolean {
    return value && value.id === option.id ? true : false;
  }

  /**
   * Сохранение изменений в заявке
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
    console.log('start', moment(this.selectedRequest.startTime).format('DD.MM.YYYY HH:mm'));
    console.log('end', moment(this.selectedRequest.endTime).format('DD.MM.YYYY HH:mm'));
    this.store.dispatch(new RequestsEditRequest(this.selectedRequest));
  }

}
