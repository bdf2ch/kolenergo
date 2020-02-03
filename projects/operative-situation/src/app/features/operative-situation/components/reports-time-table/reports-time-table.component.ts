import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IPeriod } from '../../../../interfaces';
import { IApplicationState } from '../../../../ngrx';
import {selectPeriods, selectReports, selectSelectedPeriod, selectSelectedReport} from '../../ngrx/selectors';
import { SelectPeriod } from '../../ngrx';
import {Period, Report, ReportSummary} from '../../../../models';

@Component({
  selector: 'app-reports-time-table',
  templateUrl: './reports-time-table.component.html',
  styleUrls: ['./reports-time-table.component.less']
})
export class ReportsTimeTableComponent implements OnInit {
  public periods$: Observable<IPeriod[]>;
  public selectedPeriod$: Observable<IPeriod>;
  public reports$: Observable<ReportSummary>;
  private reports: ReportSummary;
  public selectedReport$: Observable<Report>;
  public inConsumptionMode: boolean;

  constructor(private readonly store: Store<IApplicationState>) {
    this.periods$ = this.store.pipe(select(selectPeriods));
    this.inConsumptionMode = false;
  }

  ngOnInit() {
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.reports$ = this.store.pipe(select(selectReports));
    this.reports$.subscribe((value: ReportSummary) => {
      this.reports = value;
    });
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
  }

  /**
   * Поиск отчета об оперативной обстановке по временному периоду
   * @param period - Временной период
   */
  getReportByPeriod(period: Period) {
    return this.reports && this.reports.reports[period.time] !== null ? true : false;
  }

  /**
   * Выбор текущего временного промежутка
   * @param period - Текущий временной промежуток
   */
  selectPeriod(period: IPeriod) {
    this.inConsumptionMode = false;
    this.store.dispatch(new SelectPeriod(period));
  }

  /**
   * Переход в режим отображения суточного потребления
   */
  selectConsumption() {
    this.inConsumptionMode = true;
  }

}
