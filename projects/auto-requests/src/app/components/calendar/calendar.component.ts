import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import * as moment from 'moment';

import { CalendarDay } from '../../models';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less']
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() date: Date;
  @Input() selected: Date;
  days: CalendarDay[];
  startOfMonth: moment.Moment;
  endOfMonth: moment.Moment;
  startOfCalendar: moment.Moment;
  endOfCalendar: moment.Moment;
  selectedDate: moment.Moment;

  constructor() {
    this.days = [];
    moment.updateLocale('ru', { week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
      }});
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date.currentValue) {
     this.generateMonth(changes.date.currentValue, true);
    }
  }

  /**
   * Генерациф календаря
   * @param date - Текущая дата
   * @param setSelected - Установить дату текущей
   */
  generateMonth(date: Date, setSelected?: boolean) {
    this.selectedDate = setSelected && setSelected === true ? moment(date).startOf('day') : null;
    this.startOfMonth = moment(date).startOf('month');
    this.endOfMonth = moment(date).endOf('month');
    this.startOfCalendar = moment(this.startOfMonth).startOf('week');
    this.endOfCalendar = moment(this.endOfMonth).endOf('week');
    for (let i = 0; i < this.endOfCalendar.diff(this.startOfCalendar, 'days') + 1; i++) {
      const day = moment(this.startOfCalendar).startOf('day').add(i, 'days');
      const calendarDay = new CalendarDay(day);
      calendarDay.isActive = day.isBetween(this.startOfMonth, this.endOfMonth, undefined, '[]');
      this.days.push(calendarDay);
    }
  }

  /**
   * Переход к следующему месяцу
   */
  nextMonth() {
    const firstDayOfNextMonth = this.startOfMonth.startOf('day').add(1, 'month');
    this.days = [];
    this.generateMonth(firstDayOfNextMonth.toDate(), false);
  }

  /**
   * Переход к предыдущему месяцу
   */
  prevMonth() {
    const firstDayOfNextMonth = this.startOfMonth.startOf('day').subtract(1, 'month');
    this.days = [];
    this.generateMonth(firstDayOfNextMonth.toDate(), false);
  }

}
