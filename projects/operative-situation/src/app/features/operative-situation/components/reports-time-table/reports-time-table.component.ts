import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {IDivision, IPeriod} from '../../../../interfaces';
import { IApplicationState } from '../../../../ngrx';
import {
  selectPeriods,
  selectReports,
  selectReportsTime,
  selectSelectedDivision,
  selectSelectedPeriod,
  selectSelectedReport
} from '../../ngrx/selectors';
import {SelectPeriod, SelectTime} from '../../ngrx';
import {Division, Period, Report, ReportSummary} from '../../../../models';
import {MatDialog} from '@angular/material/dialog';
import {ReportAddDialogComponent} from '../report-add-dialog/report-add-dialog.component';

@Component({
  selector: 'app-reports-time-table',
  templateUrl: './reports-time-table.component.html',
  styleUrls: ['./reports-time-table.component.less']
})
export class ReportsTimeTableComponent implements OnInit {
  public periods$: Observable<IPeriod[]>;
  public selectedPeriod$: Observable<IPeriod>;
  public reports$: Observable<ReportSummary>;
  public selectedReport$: Observable<Report>;
  public reportsTime$: Observable<string[]>;
  public selectedDivision$: Observable<IDivision>;
  private reports: ReportSummary;
  public inConsumptionMode: boolean;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {
    this.periods$ = this.store.pipe(select(selectPeriods));
    this.inConsumptionMode = false;
  }

  ngOnInit() {
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
    this.reports$ = this.store.pipe(select(selectReports));
    this.reportsTime$ = this.store.pipe(select(selectReportsTime));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.reports$.subscribe((value: ReportSummary) => {
      this.reports = value;
    });
  }

  /**
   * Поиск отчета об оперативной обстановке по временному периоду
   * @param period - Временной период
   */
  getReportByPeriod(period: Period) {
    return this.reports && this.reports.reports[period.interval] !== null ? true : false;
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

  /**
   * Выбор времени отчета
   * @param time - Время отчета
   */
  selectTime(time: string) {
    this.store.dispatch(new SelectTime(time));
  }

  /**
   * Открытие диалогового окна добавления отчета об оперативной обстановке
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '850px',
      panelClass: 'form-step-dialog'
    });
  }

}
