import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Driver, Transport } from '../../models';
import { IApplicationState } from '../../ngrx/application.state';
import { selectDrivers } from '../../ngrx/selectors';
import { selectTransport } from '../../ngrx/selectors';
import {LoadDriverReport, LoadTransportReport} from '../../features/requests/ngrx/requests.actions';

@Component({
  selector: 'app-reports-dialog',
  templateUrl: './reports-dialog.component.html',
  styleUrls: ['./reports-dialog.component.less']
})
export class ReportsDialogComponent implements OnInit {
  transport$: Observable<Transport[]>;
  drivers$: Observable<Driver[]>;
  reportsForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.transport$ = this.store.pipe(select(selectTransport));
    this.drivers$ = this.store.pipe(select(selectDrivers));
    this.reportsForm = this.builder.group({
      start: new FormControl(null, Validators.required),
      end: new FormControl(null, Validators.required),
      transport: new FormControl(null, Validators.required),
      driver: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

  /**
   * Сравнение выбранной опции со значением транспорта
   * @param option - Выбранная опция
   * @param value - Значение транспорта
   */
  transportCompare(option: Transport, value: Transport): boolean {
    return value && option.id === value.id ? true : false;
  }

  /**
   * Сравнение выбранной опции со значением водителя
   * @param option - Выбранная опция
   * @param value - Значение водителя
   */
  driverCompare(option: Driver, value: Driver): boolean {
    return value && option.id === value.id ? true : false;
  }

  /**
   * Загрузка отчета об использовании транспорта
   */
  loadTransportReport() {
    this.store.dispatch(new LoadTransportReport({
      periodStart: moment(this.reportsForm.controls.start.value).startOf('day').unix() * 1000,
      periodEnd: moment(this.reportsForm.controls.end.value).endOf('day').unix() * 1000,
      transport: this.reportsForm.controls.transport.value
    }));
  }

  /**
   * Загрузка отчета о занятости водителя
   */
  loadDriverReport() {
    this.store.dispatch(new LoadDriverReport({
      periodStart: moment(this.reportsForm.controls.start.value).startOf('day').unix() * 1000,
      periodEnd: moment(this.reportsForm.controls.end.value).endOf('day').unix() * 1000,
      driver: this.reportsForm.controls.driver.value
    }));
  }

}
