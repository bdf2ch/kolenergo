import { Component, OnInit } from '@angular/core';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {
  selectPeriods,
  selectReportByTime,
  selectReports,
  selectSelectedPeriod,
  selectSelectedReport,
  selectSelectedTime
} from '../../ngrx/selectors';
import {Period, Report, ReportSummary, TimeMark} from '../../../../models';
import {IPeriod, IReport} from '../../../../interfaces';
import {SelectTime} from "../../ngrx";
import {Time} from '@angular/common';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {
  public periods: Observable<Period[]>;
  public selectedPeriod$: Observable<IPeriod>;
  public selectedTime$: Observable<TimeMark>;
  public reports$: Observable<ReportSummary>;
  public selectedReport$: Observable<Report>;
  public selectReportByTime$: Observable<boolean>;
  private selectedTime: TimeMark;
  private reports: ReportSummary;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.periods = this.store.pipe(select(selectPeriods));
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

  getReportByTime(time: string): boolean {
    return this.reports.reports.find((report) => report.periodTime === time) ? true : false;
  }

}
