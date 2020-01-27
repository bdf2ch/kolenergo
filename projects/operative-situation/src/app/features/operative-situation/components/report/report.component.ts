import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../../../ngrx';
import { Report} from '../../../../models';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { selectSelectedReport } from '../../ngrx/selectors';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  public selectedReport$: Observable<Report>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {}

  ngOnInit() {
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
  }

  /**
   * Открытие диалогового окна добавления отчета об оперативной обстановке
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '450px'
    });
  }

}
