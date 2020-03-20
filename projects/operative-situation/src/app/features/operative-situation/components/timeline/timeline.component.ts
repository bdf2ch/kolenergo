import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import {
  selectPeriods,
  selectReportByTime,
  selectReports,
  selectSelectedPeriod,
  selectSelectedReport,
  selectSelectedTime
} from '../../ngrx/selectors';
import { IPeriod } from '../../../../interfaces';
import { Period, Report, ReportSummary, TimeMark } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import { SelectTime } from '../../ngrx';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {
  public periods$: Observable<Period[]>;
  public selectedPeriod$: Observable<IPeriod>;
  public selectedTime$: Observable<TimeMark>;
  public reports$: Observable<ReportSummary>;
  public selectedReport$: Observable<Report>;
  public selectReportByTime$: Observable<boolean>;
  private selectedTime: TimeMark;
  private reports: ReportSummary;
  public marks: TimeMark[];

  constructor(private readonly store: Store<IApplicationState>) {
    this.marks = [];
  }

  ngOnInit() {
    this.periods$ = this.store.pipe(select(selectPeriods));
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.selectedTime$ = this.store.pipe(select(selectSelectedTime));
    this.reports$ = this.store.pipe(select(selectReports));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.selectReportByTime$ = this.store.pipe(select(selectReportByTime, {mark: this.selectedTime}));
    this.selectedTime$.subscribe((value: TimeMark) => {
      this.selectedTime = value;
    });
    this.reports$.subscribe((value: ReportSummary) => {
      this.reports = value;
    });

    this.periods$.subscribe((value: Period[]) => {
      value.forEach((period: Period) => {
        const start = moment(period.start, 'HH:mm');
        const end = moment(period.end, 'HH:mm').subtract(30, 'minutes');
        this.marks.push(new TimeMark(period.id, period.start, true));
        while (start.unix() < end.unix()) {
          start.add(30, 'minutes');
          this.marks.push(new TimeMark(period.id, moment(start).format('HH:mm')));
        }
      });
    });
  }

  /**
   * Выбор времени отчета
   * @param mark - Время отчета
   */
  selectPeriodAndTime(mark: TimeMark) {
    this.store.dispatch(new SelectTime(mark));
  }

  /**
   * Поиск отчета об оперативной обстановке по временному периоду
   * @param period - Временной период
   * @param time - Время отчета
   */
  getReportByPeriodAndTime(period: IPeriod, time: string) {
    return this.reports && this.reports.reports[period.interval] && this.reports.reports[period.interval][time] ?
      this.reports.reports[period.interval][time] :
      null;
  }

  getReportByTime(mark: TimeMark): boolean {
    return this.reports.reports.find((report) => report.periodTime === mark.time) ? true : false;
  }

  selectTimeMark(mark: TimeMark) {
    this.store.dispatch(new SelectTime(mark));
  }

}
