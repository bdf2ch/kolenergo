import { Injectable } from '@angular/core';
import  {MatDialog, MatSnackBar } from '@angular/material';

import {catchError, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as moment from 'moment';

import { IServerResponse } from '@kolenergo/core';
import {
  AddReports, AddReportsSuccess, DeleteReportsByDate, DeleteReportsByDateSuccess, EditReport, EditReportSuccess,
  LoadReportsByDate,
  LoadReportsByDateSuccess,
  PressReportsActionTypes
} from './press-reports.actions';
import { PressReportsService } from '../services/press-reports.service';
import { IPressReport } from '../interfaces';
import { IApplicationState } from '../../ngrx';
import { selectSelectedDate } from './press-reports.selectors';

@Injectable()
export class PressReportsEffects {
  constructor(private actions$: Actions,
              private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly pressReports: PressReportsService) {}

  @Effect()
  loadPressReportsByDate$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.LOAD_REPORTS_BY_DATE),
    mergeMap((action: LoadReportsByDate) => this.pressReports.getReportsByDate(action.payload)
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          return new LoadReportsByDateSuccess(response);
        })
      )
    )
  );

  @Effect()
  addReports$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.ADD_REPORTS),
    withLatestFrom(
      this.store.pipe(select(selectSelectedDate))
    ),
    mergeMap(([action, date]) => this.pressReports.addReports((action as AddReports).payload)
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          this.snackBar.open(`Отчет за ${moment(date).format('DD.MM.YYYY')} добавлен`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return new AddReportsSuccess(response);
        }),
        catchError((error: any) => {
          console.error(error);
          this.snackBar.open(`При добавлении отчета произошла ошибка`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      ))
  );

  @Effect()
  addReportSuccess$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.ADD_REPORTS_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('add-report-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  editReport$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.EDIT_REPORT),
    withLatestFrom(
      this.store.pipe(select(selectSelectedDate))
    ),
    mergeMap(([action, date]) => this.pressReports.editReport((action as EditReport).payload)
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          this.snackBar.open(`Отчет за ${moment(date).format('DD.MM.YYYY')} сохранен`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return new EditReportSuccess(response);
        }),
        catchError((error: any) => {
          console.error(error);
          this.snackBar.open(`При изменении отчета произошла ошибка`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      ),
    )
  );

  @Effect()
  editReportSuccess$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.EDIT_REPORT_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('edit-report-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  deleteReports$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.DELETE_REPORTS_BY_DATE),
    withLatestFrom(
      this.store.pipe(select(selectSelectedDate))
    ),
    mergeMap(([action, date]) => this.pressReports.deleteReportsByDate((action as DeleteReportsByDate).payload)
      .pipe(
        map((response: IServerResponse<boolean>) => {
          this.snackBar.open(`Отчет за ${moment(date).format('DD.MM.YYYY')} удален`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return new DeleteReportsByDateSuccess(response);
        }),
        catchError((error: any) => {
          console.error(error);
          this.snackBar.open(`При удалении отчета произошла ошибка`, 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      ))
  );

  @Effect()
  deleteReportSuccess$ = this.actions$.pipe(
    ofType(PressReportsActionTypes.DELETE_REPORTS_BY_DATE_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('delete-report-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    mergeMap(() => EMPTY)
  );
}
