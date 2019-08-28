import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IApplicationState } from '../../../ngrx';
import { DeleteReportsByDate, selectSelectedDate } from '../../ngrx';

@Component({
  selector: 'app-report-delete-dialog',
  templateUrl: './report-delete-dialog.component.html',
  styleUrls: ['./report-delete-dialog.component.less']
})
export class ReportDeleteDialogComponent implements OnInit {
  public selectedDate$: Observable<Date>;
  public selectedDate: Date;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.selectedDate$.subscribe((value: Date) => {
      this.selectedDate = value;
    });
  }

  /**
   * Удаление отчетов о публикациях в СМИ за указанную дату
   */
  deleteReports() {
    this.store.dispatch(new DeleteReportsByDate(moment(this.selectedDate).format('DD.MM.YYYY')));
  }

}
