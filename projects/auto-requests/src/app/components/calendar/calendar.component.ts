import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

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
  @Input() requests: {date: string, count: number}[];
  @Output() select: EventEmitter<Date>;
  @Output() monthChange: EventEmitter<{start: number, end: number}>;
  @Output() periodChange: EventEmitter<{start: number, end: number}>;
  days: CalendarDay[];
  startOfMonth: moment.Moment;
  endOfMonth: moment.Moment;
  startOfCalendar: moment.Moment;
  endOfCalendar: moment.Moment;
  selectedDate: moment.Moment;

  constructor() {
    this.select = new EventEmitter<Date>();
    this.monthChange = new EventEmitter<{start: number, end: number}>();
    this.periodChange = new EventEmitter<{start: number, end: number}>();
    this.days = [];
    moment.updateLocale('ru', { week: {
        dow: 1, // First day of week is Monday
        doy: 4  // First week of year must contain 4 January (7 + 1 - 4),
      }});
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date && changes.date.currentValue) {
     this.generateMonth(changes.date.currentValue, true);
    }
    if (changes.requests && changes.requests.currentValue) {
      this.generateNotifications(changes.requests.currentValue);
    }
  }

  /**
   * Генерация календаря
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
    this.periodChange.emit({
      start: this.days[0].date.unix() * 1000,
      end: this.days[this.days.length - 1].date.endOf('day').unix() * 1000
    });
  }

  /**
   * Генерация уведомлений в календаре
   * @param notifications - Перечень уведомлений
   */
  generateNotifications(notifications: {date: string, count: number}[]) {
    this.days.forEach((day: CalendarDay) => {
      notifications.forEach((item: {date: string, count: number}) => {
        if (day.date.format('DD.MM.YYYY') === item.date) {
          day.notification = item.count.toString();
        }
      });
    });
  }

  /**
   * Переход к следующему месяцу
   */
  nextMonth() {
    const firstDayOfNextMonth = this.startOfMonth.startOf('day').add(1, 'month');
    this.days = [];
    this.generateMonth(firstDayOfNextMonth.toDate(), false);
    this.generateNotifications(this.requests);
    this.monthChange.emit({
      start: this.days[0].date.unix() * 1000,
      end: this.days[this.days.length - 1].date.endOf('day').unix() * 1000
    });
  }

  /**
   * Переход к предыдущему месяцу
   */
  prevMonth() {
    const firstDayOfNextMonth = this.startOfMonth.startOf('day').subtract(1, 'month');
    this.days = [];
    this.generateMonth(firstDayOfNextMonth.toDate(), false);
    this.generateNotifications(this.requests);
    this.monthChange.emit({
      start: this.days[0].date.unix() * 1000,
      end: this.days[this.days.length - 1].date.endOf('day').unix() * 1000
    });
  }

  /**
   * Выбор даты
   * @param date - Выбранная дата
   */
  selectDate(date: moment.Moment) {
    this.select.emit(date.toDate());
  }
}
