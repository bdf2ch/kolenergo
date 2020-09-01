import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSelectChange, MatDatepickerInputEvent, MatDialogRef } from '@angular/material';

import * as moment from 'moment';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterManager, SearchFilter, User } from '@kolenergo/core';
import { IApplicationState } from '../../ngrx/application.state';
import { ApplicationClearFilters, ApplicationSetFilters } from '../../ngrx/application.actions';
import { selectDrivers, selectFilters, selectStatuses, selectTransport } from '../../ngrx/selectors';
import { Driver, RequestStatus, Transport } from '../../models';
import { TransportTypeaheadComponent } from '../transport-typeahead/transport-typeahead.component';
import { DriverTypeaheadComponent } from '../driver-typeahead/driver-typeahead.component';
import { UserSearchComponent } from '../user-search/user-search.component';



@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.less']
})
export class FiltersDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('transport', {static: true}) transport: TransportTypeaheadComponent;
  @ViewChild('driver', {static: true}) driver: DriverTypeaheadComponent;
  @ViewChild('user', {static: true}) user: UserSearchComponent;
  filtersForm: FormGroup;
  filters$: Observable<FilterManager>;
  filters: FilterManager;
  statuses$: Observable<RequestStatus[]>;
  transport$: Observable<Transport[]>;
  drivers$: Observable<Driver[]>;

  constructor(
    private readonly builder: FormBuilder,
    private readonly dialog: MatDialogRef<FiltersDialogComponent>,
    private readonly store: Store<IApplicationState>
  ) {
    this.filters$ = this.store.pipe(select(selectFilters));
    this.statuses$ = this.store.pipe(select(selectStatuses));
    this.transport$ = this.store.pipe(select(selectTransport));
    this.drivers$ = this.store.pipe(select(selectDrivers));
  }

  ngOnInit() {
    this.filtersForm = this.builder.group({
      start: new FormControl(null),
      end: new FormControl(null),
      status: new FormControl(null),
      transport: new FormControl(null),
      driver: new FormControl(null),
      user: new FormControl(null)
    });
    this.filters$.subscribe((filters: FilterManager) => {
      if (filters) {
        this.filtersForm.controls.start.setValue(filters.getFilterById('startDate').getValue());
        this.filtersForm.controls.end.setValue(filters.getFilterById('endDate').getValue());
        this.filtersForm.controls.status.setValue(filters.getFilterById('status').getValue());
        this.filtersForm.controls.transport.setValue(filters.getFilterById('transport').getValue());
        this.filtersForm.controls.driver.setValue(filters.getFilterById('driver').getValue());
        this.filtersForm.controls.user.setValue(filters.getFilterById('user').getValue());
        // this.transport.setSelected(filters.getFilterById('transport').getValue());
      }
    });
    console.log(this.transport);
  }

  /**
   * Событие выбора транспорта
   * @param transport - Выбранный транспорт
   */
  transportSelected(transport: Transport) {
    this.filtersForm.controls.transport.setValue(transport);
    this.filtersForm.markAsDirty();
  }

  /**
   * Сборс транспорта
   */
  transportCleared() {
    this.filtersForm.controls.transport.setValue(null);
    this.filtersForm.markAsDirty();
  }

  /**
   * Событие выбора заказчика
   * @param user - Выбранный заказчик
   */
  userSelected(user: User) {
    this.filtersForm.controls.user.setValue(user);
    this.filtersForm.markAsDirty();
  }

  /**
   * Сброс заказчика
   */
  userCleared() {
    this.filtersForm.controls.user.setValue(null);
  }

  /**
   * Событие выбора водителя
   * @param driver - Выбранный водитель
   */
  driverSelected(driver: Driver) {
    this.filtersForm.controls.driver.setValue(driver);
    this.filtersForm.markAsDirty();
  }

  /**
   * Сброс водителя
   */
  driverCleared() {
    this.filtersForm.controls.driver.setValue(null);
    this.filtersForm.markAsDirty();
  }

  /**
   * Сравнение выбранной опции со значением статуса
   * @param option - Выбранная опция
   * @param value - Значение статуса
   */
  statusCompare(option: RequestStatus, value: RequestStatus): boolean {
    return value && option.id === value.id ? true : false;
  }

  /**
   * Выбор инициатора заявки
   * @param user - Пользователь
   */
  selectUser(user: User | string) {
    // this.request.initiator = user;
  }

  /**
   * Применение фильтров
   */
  applyFilters() {
    console.log(this.filtersForm.value);
    const filters = [
      new SearchFilter<Date>(
        'startDate',
        'Начало периода',
        this.filtersForm.controls.start.value ? moment(this.filtersForm.controls.start.value).toDate() : null,
        (val: Date) => `с ${moment(val).format('DD.MM.YYYY')}`
      ),
      new SearchFilter<Date>(
        'endDate',
        'Окончание периода',
        this.filtersForm.controls.end.value ? moment(this.filtersForm.controls.end.value).toDate() : null,
        (val: Date) => `по ${moment(val).format('DD.MM.YYYY')}`
      ),
      new SearchFilter<RequestStatus>(
        'status',
        'Статус заявки',
        this.filtersForm.controls.status.value,
        (val: RequestStatus) => val.title
      ),
      new SearchFilter<Transport>(
        'transport',
        'Транспорт',
        this.filtersForm.controls.transport.value,
        (val: Transport) => val.model
      ),
      new SearchFilter<Driver>(
        'driver',
        'Водитель',
        this.filtersForm.controls.driver.value,
        (val: Driver) => `${val.firstName} ${val.lastName}`
      ),
      new SearchFilter<User>(
        'user',
        'Заказчик',
        this.filtersForm.controls.user.value,
        (val: User) => `${val.firstName} ${val.lastName}`
      ),
    ];
    this.store.dispatch(new ApplicationSetFilters(filters));
    this.dialog.close();
  }

  /**
   * Сброс фильтров заявок
   */
  clearFilters() {
    this.filtersForm.controls.start.setValue(null);
    this.filtersForm.controls.end.setValue(null);
    this.filtersForm.controls.status.setValue(null);
    this.filtersForm.controls.transport.setValue(null);
    this.filtersForm.controls.driver.setValue(null);
    this.filtersForm.controls.user.setValue(null);
    this.transport.clearSelected();
    this.driver.clearSelected();
    this.user.clearSelected();
    this.filtersForm.markAsPristine();
    this.store.dispatch(new ApplicationClearFilters());
  }

  ngAfterViewInit(): void {

  }
}
