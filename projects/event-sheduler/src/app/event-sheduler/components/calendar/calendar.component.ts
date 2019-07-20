import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import * as moment from 'moment';

import {User} from '@kolenergo/core';
import {ECalendarModes} from '../../enums/calendar-modes.enum';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; height: 100%; }']
})
export class CalendarComponent implements OnInit, OnChanges {
  private modes = ECalendarModes;
  public currentMode = ECalendarModes.WEEK_MODE;
  private periodDay =  null;
  private periodStart = null;
  private periodEnd = null;
  private days: Date[] = [];
  @Input() mode: ECalendarModes;
  @Input() date: Date;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('date')) {
      const date = moment(changes.date.currentValue).startOf('day');
      console.log('date', date.format('DD.MM.YYYY'));
      switch (this.mode) {
        case this.modes.DAY_MODE:
          this.periodDay = date.toDate();
          this.periodStart = moment(this.periodDay).startOf('day').toDate();
          this.periodEnd = moment(this.periodDay).endOf('day').toDate();
          break;
        case this.modes.WEEK_MODE:
          this.periodStart = date.startOf('day').toDate();
          this.periodEnd = date.add(6, 'day').endOf('day').toDate();
          this.periodDay = null;
          let start = moment(this.periodStart).unix();
          while (start < moment(this.periodEnd).unix()) {
            this.days.push(moment.unix(start).startOf('day').toDate());
            start += 86400;
          }
          break;
        case this.modes.MONTH_MODE:
          this.periodStart = date.startOf('month').toDate();
          this.periodEnd = date.endOf('month').toDate();
          this.periodDay = null;
          break;
      }
      console.log('periodStart', moment(this.periodStart).format('DD.MM.YYYY, HH:mm'));
      console.log('periodEnd', moment(this.periodEnd).format('DD.MM.YYYY, HH:mm'));
      console.log('days', this.days);
    }
  }

  /**
   * Изменение режима отображения календаря
   * @param mode - Выбранный режим отображения
   */
  changeMode(mode: ECalendarModes) {
    this.mode = mode;
    const date = moment(this.date);
    this.days = [];
    switch (mode) {
      case this.modes.DAY_MODE:
        this.periodDay = date.toDate();
        this.periodStart = date.startOf('day').toDate();
        this.periodEnd = date.endOf('day').toDate();
        break;
      case this.modes.WEEK_MODE:
        this.periodStart = date.startOf('day').toDate();
        this.periodEnd = date.add(6, 'day').endOf('day').toDate();
        this.periodDay = null;
        let start = moment(this.periodStart).unix();
        while (start < moment(this.periodEnd).unix()) {
          this.days.push(moment.unix(start).startOf('day').toDate());
          start += 86400;
        }
        break;
      case this.modes.MONTH_MODE:
        this.periodStart = date.startOf('month').toDate();
        this.periodEnd = date.endOf('month').toDate();
        break;
    }
    console.log('periodStart', moment(this.periodStart).format('DD.MM.YYYY, HH:mm'));
    console.log('periodEnd', moment(this.periodEnd).format('DD.MM.YYYY, HH:mm'));
  }

  prevPeriod() {
    this.days = [];
    switch (this.mode) {
      case this.modes.DAY_MODE:
        this.periodDay = moment(this.periodDay).subtract(1, 'day').toDate();
        this.periodStart = moment(this.periodDay).startOf('day').toDate();
        this.periodEnd = moment(this.periodDay).endOf('day').toDate();
        break;
      case this.modes.WEEK_MODE:
        this.periodStart = moment(this.periodStart).subtract(1, 'week').startOf('day').toDate();
        this.periodEnd = moment(this.periodEnd).subtract(1, 'week').endOf('day').toDate();
        let start = moment(this.periodStart).unix();
        while (start < moment(this.periodEnd).unix()) {
          console.log('day');
          this.days.push(moment.unix(start).startOf('day').toDate());
          start += 86400;
        }
        break;
      case this.modes.MONTH_MODE:
        this.periodStart = moment(this.periodStart).startOf('month').subtract(1, 'month').startOf('month').toDate();
        this.periodEnd = moment(this.periodEnd).endOf('month').subtract(1, 'month').endOf('month').toDate();
        break;
    }
    console.log('periodStart', moment(this.periodStart).format('DD.MM.YYYY, HH:mm'));
    console.log('periodEnd', moment(this.periodEnd).format('DD.MM.YYYY, HH:mm'));
    console.log('days', this.days);
  }

  nextPeriod() {
    this.days = [];
    switch (this.mode) {
      case this.modes.DAY_MODE:
        this.periodDay = moment(this.periodDay).add(1, 'day').toDate();
        this.periodStart = moment(this.periodDay).startOf('day').toDate();
        this.periodEnd = moment(this.periodDay).endOf('day').toDate();
        break;
      case this.modes.WEEK_MODE:
        this.periodStart = moment(this.periodStart).add(1, 'week').startOf('day').toDate();
        this.periodEnd = moment(this.periodEnd).add(1, 'week').endOf('day').toDate();
        let start = moment(this.periodStart).unix();
        while (start < moment(this.periodEnd).unix()) {
          console.log('day');
          this.days.push(moment.unix(start).startOf('day').toDate());
          start += 86400;
        }
        break;
      case this.modes.MONTH_MODE:
        this.periodStart = moment(this.periodStart).startOf('month').add(1, 'month').startOf('month').toDate();
        this.periodEnd = moment(this.periodEnd).endOf('month').add(1, 'month').endOf('month').toDate();
        break;
    }
    console.log('periodStart', moment(this.periodStart).format('DD.MM.YYYY, HH:mm'));
    console.log('periodEnd', moment(this.periodEnd).format('DD.MM.YYYY, HH:mm'));
  }

  onUserSelect(user: User) {
    console.log('selected user', user);
  }

  addUserToList() {
    console.log('user list action clicked');
  }
}
