import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as saver from 'file-saver';

import { actionTypes, IServerResponse, AuthenticationSignInSuccess } from '@kolenergo/core';
import {
  OperativeSituationActionTypes,
  LoadInitialDataSuccess,
  LoadInitialDataFail,
  NavigateToSignInPage,
  LoadReportsByDivision,
  LoadReportsByDivisionSuccess,
  LoadReportsByDivisionFail,
  LoadReportsByCompanySuccess,
  LoadReportsByCompanyFail,
  LoadReportsByCompany,
  AddReport,
  AddReportSuccess,
  AddReportFail,
  AddConsumptionReport,
  AddConsumptionReportFail,
  AddConsumptionReportSuccess,
  EditReport,
  EditReportFail,
  EditReportSuccess,
  ExportReportFail,
  ExportReportSuccess,
  SwitchToMobileMode,
  CloseSidebar, OpenSidebar
} from './operative-situation.actions';
import { OperativeSituationService } from '../../../services/operative-situation.service';
import { IApplicationState } from '../../../ngrx';
import { IAppInitData, IReportSummary } from '../../../interfaces';
import {selectSelectedCompany, selectSelectedDivision, selectSelectedTime} from './selectors';
import {ReportSummary} from '../../../models';

@Injectable()
export class OperativeSituationEffects {
  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly osr: OperativeSituationService) {}

  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']).then(() => {
        const dialog = this.dialog.getDialogById('sign-in-dialog');
        if (dialog) {
          dialog.close();
        }
      });
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

  @Effect()
  signOutSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/sign-in']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.LOAD_INITIAL_DATA),
    mergeMap(() => this.osr.getInitialData()
      .pipe(
        map((response: IServerResponse<IAppInitData>) => {
          return new LoadInitialDataSuccess(response);
        }),
        catchError(() => of(new LoadInitialDataFail()))
      )
    )
  );

  @Effect()
  loadInitialDataSuccess$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.LOAD_INITIAL_DATA_SUCCESS),
    map((action) => {
      return (action as LoadInitialDataSuccess).payload.data.user
        ? new AuthenticationSignInSuccess((action as LoadInitialDataSuccess).payload.data.user)
        : new NavigateToSignInPage();
    })
  );

  @Effect()
  navigateToSignInPage$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.NAVIGATE_TO_SIGN_IN_PAGE),
    tap(() => {
      this.router.navigate(['sign-in']);
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadReportsByDivision$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.LOAD_REPORTS_BY_DIVISION),
    withLatestFrom(this.store.pipe(select(selectSelectedDivision))),
    mergeMap(([action, division]) => this.osr.getReports(0, division.id)
      .pipe(
        map((response: IServerResponse<IReportSummary>) => new LoadReportsByDivisionSuccess(response)),
        catchError(() => of(new LoadReportsByDivisionFail()))
      )
    )
  );

  @Effect()
  loadReportsByCompany$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.LOAD_REPORTS_BY_COMPANY),
    withLatestFrom(this.store.pipe(select(selectSelectedCompany))),
    mergeMap(([action, company]) => this.osr.getReports(company.id, 0)
      .pipe(
        map((response: IServerResponse<IReportSummary>) => new LoadReportsByCompanySuccess(response)),
        catchError(() => of(new LoadReportsByCompanyFail()))
      )
    )
  );

  @Effect()
  addReport$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_REPORT),
    mergeMap((action) => this.osr.addReport((action as AddReport).payload)
      .pipe(
        map((response: IServerResponse<IReportSummary>) => new AddReportSuccess(response)),
        catchError(() => of(new AddReportFail()))
      )
    )
  );

  @Effect()
  AddReportSuccess$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_REPORT_SUCCESS),
    tap((action: AddReportSuccess) => {
      this.dialog.getDialogById('add-report-dialog').close();
      this.snackBar.open(
        `Отчет на ${new ReportSummary(action.payload.data).reports.pop().periodTime} добавлен`,
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addReportFail$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_REPORT_FAIL),
    tap(() => {
      this.snackBar.open(
        'При добавлении отчета произошла ошибка',
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  editReport$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EDIT_REPORT),
    mergeMap((action: EditReport) => this.osr.editReport(action.payload)
      .pipe(
        map((response: IServerResponse<IReportSummary>) => new EditReportSuccess(response)),
        catchError(() => of(new EditReportFail()))
      )
    )
  );

  @Effect()
  editReportSuccess$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EDIT_REPORT_SUCCESS),
    withLatestFrom(
      this.store.pipe(select(selectSelectedTime))
    ),
    tap(([action, selectedTime]) => {
      this.dialog.getDialogById('edit-report-dialog').close();
      this.snackBar.open(
        `Отчет на ${selectedTime.time} изменен`,
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  editReportFail$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EDIT_REPORT_FAIL),
    tap(() => {
      this.snackBar.open(
        'При изменении отчета произошла ошибка',
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  exportReport$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EXPORT_REPORT),
    withLatestFrom(
      this.store.pipe(select(selectSelectedTime))
    ),
    mergeMap(([action, time]) => this.osr.exportReport(time.time.replace(':', ''))
      .pipe(
        map((response: Blob) => new ExportReportSuccess(response)),
        catchError(() => of(new ExportReportFail()))
      )
    )
  );

  @Effect()
  exportReportSuccess$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EXPORT_REPORT_SUCCESS),
    withLatestFrom(
      this.store.pipe(select(selectSelectedTime))
    ),
    tap(([action, time]) => {
      saver.saveAs((action as ExportReportSuccess).payload, `Оперативная обстановка на ${time.time}.xlsx`);
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  exportReportFail$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.EXPORT_REPORT_FAIL),
    tap(() => {
      this.snackBar.open(
        'При экспорте отчета произошла ошибка',
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addConsumption$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_CONSUMPTION),
    withLatestFrom(
      this.store.pipe(select(selectSelectedCompany)),
      this.store.pipe(select(selectSelectedDivision))
    ),
    mergeMap(([action, company, division]) => this.osr.addConsumption(company.id, division.id, (action as AddConsumptionReport).payload)
      .pipe(
        map((response: IServerResponse<number>) => new AddConsumptionReportSuccess(response)),
        catchError(() => of(new AddConsumptionReportFail()))
      )
    )
  );

  @Effect()
  addConsumptionSuccess$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_CONSUMPTION_SUCCESS),
    tap((action: AddConsumptionReportSuccess) => {
      this.snackBar.open(
        `Данные о потреблении добавлены`,
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addConsumptionFail$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.ADD_CONSUMPTION_FAIL),
    tap(() => {
      this.snackBar.open(
        'При добавлении Данных о потреблении произошла ошибка',
        'Закрыть',
        {horizontalPosition: 'left', verticalPosition: 'bottom', duration: 3000}
      );
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  selectCompany$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.SELECT_COMPANY),
    mergeMap(() => of(new LoadReportsByCompany()))
  );

  @Effect()
  selectDivision$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.SELECT_DIVISION),
    mergeMap(() => of(new LoadReportsByDivision()))
  );

  @Effect()
  switchToMobileMode$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.SWITCH_TO_MOBILE_MODE),
    map((action: SwitchToMobileMode) => action.payload === true ? new CloseSidebar() : new OpenSidebar())
  );

}
