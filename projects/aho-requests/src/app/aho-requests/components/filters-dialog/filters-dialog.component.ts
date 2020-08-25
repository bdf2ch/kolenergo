import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatDatepickerInputEvent, MatDialogRef, MatSelectChange } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Moment } from 'moment';

import {
  ApplyFilters,
  IApplicationState, ResetFilters,
  selectEmployees,
  selectFilters,
  selectRequestStatuses,
  selectRequestTypes
} from '../../../state';
import { AhoRequestStatus, AhoRequestType, FilterManager } from '../../models';
import { User } from 'kolenergo-core';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.less']
})
export class FiltersDialogComponent implements OnInit {
  public filters$: Observable<FilterManager>;
  public minStartDate: Date;
  public maxStartDate: Date;
  public minEndDate: Date;
  public maxEndDate: Date;
  public requestTypes$: Observable<AhoRequestType[]>;
  public requestStatuses$: Observable<AhoRequestStatus[]>;
  public employees$: Observable<User[]>;
  public manager: FilterManager;

  /**
   * Конструктор
   * @param store - Контейнер состояния приложения
   * @param router - Роутер
   * @param dialogRef - Диалгоовое окно с фильтрами
   */
  constructor(private store: Store<IApplicationState>,
              private router: Router,
              private dialogRef: MatDialogRef<FiltersDialogComponent>) {}

  ngOnInit() {
    this.filters$ = this.store.pipe(select(selectFilters));
    this.minStartDate = null;
    this.maxStartDate = new Date();
    this.minEndDate = null;
    this.maxEndDate = new Date();
    this.requestTypes$ = this.store.pipe(select(selectRequestTypes));
    this.requestStatuses$ = this.store.pipe(select(selectRequestStatuses));
    this.employees$ = this.store.pipe(select(selectEmployees));

    this.filters$.subscribe((filters: FilterManager) => {
      this.manager = filters;
    });
  }

  /**
   * Изменение фильтра начальной даты
   * @param event - Событие выбора начальной даты
   */
  startDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.minEndDate = event.value.toDate();
    this.manager.getFilterById('start-selectedDate$').setValue(event.value.toDate());
  }

  /**
   * Изменение фильтра конечной даты
   * @param event - Событие выбора конечной даты
   */
  endDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.maxStartDate = event.value.toDate();
    this.manager.getFilterById('end-selectedDate$').setValue(event.value.hours(23).minutes(59).seconds(59).toDate());
  }

  /**
   * Изменение фильтра категории заявки
   * @param event - Событие выбора категории заявки
   */
  requestTypeChange(event: MatSelectChange) {
    this.manager.getFilterById('request-type').setValue(event.value);
  }

  /**
   * Изменение фильтра статуса заявки
   * @param event - Событие выбора статуса заявки
   */
  requestStatusChange(event: MatSelectChange) {
    this.manager.getFilterById('request-status').setValue(event.value);
  }

  /**
   * Изменение фильтра исполнителя
   * @param event - Событие выбора исполнителя
   */
  requestEmployeeChange(event: MatSelectChange) {
    console.log(event);
    this.manager.getFilterById('request-employee').setValue(event.value);
  }

  /**
   * Применение фильтров
   */
  applyFilters() {
    this.store.dispatch(new ApplyFilters(this.manager.getFilters()));
    this.dialogRef.close();
    this.router.navigate(['/']);
  }

  /**
   * Очистка фильтров
   */
  resetFilters() {
    this.store.dispatch(new ResetFilters());
    this.dialogRef.close();
    this.minEndDate = null;
    this.maxStartDate = new Date();
    this.minEndDate = null;
    this.maxEndDate = new Date();
    this.router.navigate(['/']);
  }
}
