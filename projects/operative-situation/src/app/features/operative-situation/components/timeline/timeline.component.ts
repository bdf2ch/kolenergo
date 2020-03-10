import { Component, OnInit } from '@angular/core';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectPeriods, selectReports, selectSelectedPeriod, selectSelectedReport} from '../../ngrx/selectors';
import {Period, Report, ReportSummary} from '../../../../models';
import {IPeriod} from "../../../../interfaces";
import {SelectTime} from "../../ngrx";

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.less']
})
export class TimelineComponent implements OnInit {
  public periods: Observable<Period[]>;
  public selectedPeriod$: Observable<IPeriod>;
  public reports$: Observable<ReportSummary>;
  public selectedReport$: Observable<Report>;
  private reports: ReportSummary;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.periods = this.store.pipe(select(selectPeriods));
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.reports$ = this.store.pipe(select(selectReports));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.reports$.subscribe((value: ReportSummary) => {
      this.reports = value;
    });
  }

  /**
   * Выбор времени отчета
   * @param period - Временной период
   * @param time - Время отчета
   */
  selectPeriodAndTime(period: IPeriod, time: string) {
    this.store.dispatch(new SelectTime({period, time}));
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

}
