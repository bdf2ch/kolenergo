import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';

import { Company } from '@kolenergo/core';
import { PressReport } from '../../models';
import { IApplicationState } from '../../../ngrx';
import {
  LoadReportsByDate,
  selectCompanies,
  selectDate,
  selectFetchingInProgress,
  selectReports,
  selectSelectedDate
} from '../../ngrx';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import {Moment} from 'moment';
import {ReportDeleteDialogComponent} from '../report-delete-dialog/report-delete-dialog.component';
import {ReportEditDialogComponent} from '../report-edit-dialog/report-edit-dialog.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.less']
})
export class ReportsListComponent implements OnInit {
  public date$: Observable<Date>;
  public selectedDate$: Observable<Date>;
  public companies$: Observable<Company[]>;
  public reports$: Observable<PressReport[]>;
  public fetchingInProgress$: Observable<boolean>;
  public reports: PressReport[];
  public selectedDate: Date;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog) {
    this.reports = [];
  }

  ngOnInit() {
    this.date$ = this.store.pipe(select(selectDate));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.reports$ = this.store.pipe(select(selectReports));
    this.fetchingInProgress$ = this.store.pipe(select(selectFetchingInProgress));

    this.selectedDate$.subscribe((value: Date) => {
      this.selectedDate = value;
    });
    this.reports$.subscribe((value: PressReport[]) => {
      this.reports = value;
    });
  }

  /**
   * Поиск отчета об публикациях в СМИ по идентификатору организации
   * @param companyId - Идентификатор оргвнизации
   */
  getReportByCompanyId(companyId: number): PressReport|null {
    const findReportByCompanyId = (report: PressReport) => report.company.id === companyId;
    const result = this.reports.find(findReportByCompanyId);
    return result ? result : null;
  }

  /**
   * Событие выбора даты отчета
   * @param date - Выбранная дата
   */
  onSelectDate(date: Date) {
    this.store.dispatch(new LoadReportsByDate(moment(date).format('DD.MM.YYYY')));
  }

  /**
   * Открытие диалогового окна добавления отчета
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '1000px'
    });
  }

  /**
   * Открытие диалогового окна редактирования отчета
   */
  openEditReportDialog() {
    this.dialog.open(ReportEditDialogComponent, {
      id: 'edit-report-dialog',
      width: '1000px'
    });
  }

  /**
   * Открытие диалогового окна удаления отчета
   */
  openDeleteReportDialog() {
    this.dialog.open(ReportDeleteDialogComponent, {
      id: 'delete-report-dialog',
      width: '350px'
    });
  }

}
