import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@kolenergo/core';
import {
  ApplicationCalendarPeriodChange,
  ApplicationLoadCalendarRequests,
  ApplicationOpenAddRequestDialog,
  ApplicationOpenSignInDialog,
  ApplicationSelectDate,
  ApplicationSelectViewMode,
  IApplicationState,
  selectDate,
  selectIsLoading,
  selectSelectedDate,
  selectUser,
  selectViewMode
} from './ngrx';
import { EViewMode } from './enums';
import {selectCalendarRequests} from './features/requests/ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  idLoading$: Observable<boolean>;
  user$: Observable<IUser>;
  viewMode$: Observable<EViewMode>;
  viewModes = EViewMode;
  date$: Observable<Date>;
  selectedDate$: Observable<Date>;
  calendarRequests$: Observable<{date: string, count: number}[]>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.date$ = this.store.pipe(select(selectDate));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.idLoading$ = this.store.pipe(select(selectIsLoading));
    this.user$ = this.store.pipe(select(selectUser));
    this.viewMode$ = this.store.pipe(select(selectViewMode));
    this.calendarRequests$ = this.store.pipe(select(selectCalendarRequests));
  }

  /**
   * Выбор режима отображения заявок
   * @param mode - Режим отображения
   */
  selectViewMode(mode: EViewMode) {
    this.store.dispatch(new ApplicationSelectViewMode(mode));
  }

  /**
   * Открытие диалогового окна авторизации пользователя
   */
  openSignInDialog() {
    this.store.dispatch(new ApplicationOpenSignInDialog(false));
  }

  /**
   * Открытие диалогового окна добавления новой заявки
   */
  openAddRequestDialog() {
    this.store.dispatch(new ApplicationOpenAddRequestDialog());
  }

  /**
   * Выбор даты
   * @param date - Выбранная дата
   */
  selectDate(date: Date) {
    this.store.dispatch(new ApplicationSelectDate(date));
  }

  /**
   * Изменение периода календаря
   * @param period - Период календаря
   */
  periodChange(period: {start: number, end: number}) {
    this.store.dispatch(new ApplicationCalendarPeriodChange(period));
  }

  /**
   * Изменение месяца в календаре
   * @param period - Период от начала до конца текущего календарного периода
   */
  monthChange(period: {start: number, end: number}) {
    this.store.dispatch(new ApplicationCalendarPeriodChange({start: period.start, end: period.end}));
    this.store.dispatch(new ApplicationLoadCalendarRequests({start: period.start, end: period.end}));
  }
}
