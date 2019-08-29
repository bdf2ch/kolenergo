import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import * as moment from 'moment';
import { Store, select } from '@ngrx/store';
import { selectDate } from '../../ngrx';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../../ngrx';


@Component({
  selector: 'app-report-dates',
  templateUrl: './report-dates.component.html',
  styleUrls: ['./report-dates.component.less']
})
export class ReportDatesComponent implements OnInit, OnChanges {
  public periodStart: Date = null;
  public periodEnd: Date = null;
  public days: Date[];
  public weekIndex: number;
  public selectedDate: Date;
  public currentDate$: Observable<Date>;
  public currentDate: Date;
  @Input() date: Date;
  @Output() select: EventEmitter<Date>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.days = [];
    this.weekIndex = 0;
    this.selectedDate = null;
    this.select = new EventEmitter<Date>();
  }

  ngOnInit() {
    this.currentDate$ = this.store.pipe(select(selectDate));
    this.currentDate$.subscribe((value: Date) => {
      this.currentDate = value;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('date') && changes.date.currentValue) {
      const value = moment(changes.date.currentValue).startOf('day');
      if (!this.periodStart && !this.periodEnd) {
        this.days = [];
        this.periodStart = value.toDate();
        this.periodEnd = value.subtract(7, 'day').startOf('day').toDate();
        this.selectedDate = this.periodStart;
        let start = moment(this.periodStart).unix();
        while (start > moment(this.periodEnd).unix()) {
          this.days.push(moment.unix(start).startOf('day').toDate());
          start -= 86400;
        }
        this.periodEnd = moment(this.periodEnd).add(1, 'day').toDate();
      } else {
        if (value.toDate().getTime() > this.periodStart.getTime() || value.toDate().getTime() < this.periodEnd.getTime()) {
          this.days = [];
          this.periodStart = value.startOf('day').toDate();
          this.periodStart = this.periodStart > this.currentDate ? this.currentDate : this.periodStart;
          this.periodEnd = value.subtract(7, 'day').startOf('day').toDate();
          this.selectedDate = this.periodStart;
          let start = moment(this.periodStart).unix();
          while (start > moment(this.periodEnd).unix()) {
            this.days.push(moment.unix(start).startOf('day').toDate());
            start -= 86400;
          }
          this.periodEnd = moment(this.periodEnd).add(1, 'day').toDate();
        } else if (value.toDate().getTime() < this.periodStart.getTime() || value.toDate().getTime() > this.periodEnd.getTime()) {
          this.selectedDate = value.toDate();
          this.periodStart = this.periodStart > this.currentDate ? this.currentDate : this.periodStart;
        }
      }
    }
  }

  nextWeek() {
    if (this.periodStart.getTime() < this.currentDate.getTime()) {
      this.days = [];
      this.periodStart = moment(this.periodStart).add(1, 'week').startOf('day').toDate();
      this.periodStart = this.periodStart > this.currentDate ? this.currentDate : this.periodStart;
      this.periodEnd = moment(this.periodStart).subtract(1, 'week').startOf('day').toDate();
      this.selectedDate = this.periodStart;
      this.selectDate(this.periodStart);
      let start = moment(this.periodStart).unix();
      while (start > moment(this.periodEnd).unix()) {
        this.days.push(moment.unix(start).startOf('day').toDate());
        start -= 86400;
      }
    }
  }

  previousWeek() {
      this.days = [];
      this.periodStart = moment(this.periodStart).subtract(1, 'week').startOf('day').toDate();
      this.periodEnd = moment(this.periodStart).subtract(1, 'week').endOf('day').toDate();
      this.selectedDate = this.periodStart;
      this.selectDate(this.periodStart);
      let start = moment(this.periodStart).unix();
      while (start > moment(this.periodEnd).unix()) {
        this.days.push(moment.unix(start).startOf('day').toDate());
        start -= 86400;
      }
      this.periodEnd = moment(this.periodEnd).add(1, 'day').toDate();
  }

  /**
   * Выбор даты
   * @param date - Выбранная дата
   */
  selectDate(date: Date) {
    this.selectedDate = date;
    this.select.emit(date);
  }

}
