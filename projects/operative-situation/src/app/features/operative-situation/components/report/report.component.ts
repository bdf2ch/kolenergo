import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, } from '../../../../ngrx';
import { Report} from '../../../../models';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import {selectSelectedDivision, selectSelectedReport} from '../../ngrx/selectors';
import {IDivision} from '../../../../interfaces';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  public selectedDivision$: Observable<IDivision>;
  public selectedReport$: Observable<Report>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {}

  ngOnInit() {
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
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
