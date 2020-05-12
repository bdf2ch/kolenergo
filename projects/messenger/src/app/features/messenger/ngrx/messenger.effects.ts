import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';

import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {AuthenticationSignInSuccess, IServerResponse} from '@kolenergo/core';
import { IApplicationInitialData } from '../../../interfaces';
import { ApplicationService } from '../../../services/application.service';
import { IApplicationState } from '../../../ngrx';
import {
  LoadChat,
  LoadInitialDataFail,
  LoadInitialDataSuccess,
  MessengerActionTypes,
  SelectChat
} from './messenger.actions';
import {ChatsService} from "../../../services/chats.service";
import {selectSelectedChat} from "./selectors";

@Injectable()
export class MessengerEffects {
  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly store: Store<IApplicationState>,
    private readonly actions$: Actions,
    private readonly application: ApplicationService,
    private readonly chats: ChatsService
  ) {}

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(MessengerActionTypes.LOAD_INITIAL_DATA),
    mergeMap(() => this.application.getInitialData()
      .pipe(
        map((response: IServerResponse<IApplicationInitialData>) => {
          return new LoadInitialDataSuccess(response);
        }),
        catchError(() => of(new LoadInitialDataFail()))
      )
    )
  );

  @Effect()
  loadInitialDataSuccess$ = this.actions$.pipe(
    ofType(MessengerActionTypes.LOAD_INITIAL_DATA_SUCCESS),
    map((action: LoadInitialDataSuccess) => {
      // return action.payload.data.user
        return new AuthenticationSignInSuccess(action.payload.data.user);
        // : new NavigateToSignInPage();
    })
  );

  @Effect()
  selectChat$ = this.actions$.pipe(
    ofType(MessengerActionTypes.SELECT_CHAT),
    map((action: SelectChat) => {
      return new LoadChat();
    })
  );

  @Effect()
  loadChat$ = this.actions$.pipe(
    ofType(MessengerActionTypes.LOAD_CHAT),
    withLatestFrom(this.store.pipe(select(selectSelectedChat))),
    tap(([action, chat]) => this.chats.load(chat)),
    mergeMap(() => EMPTY)
  );

              /*
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
  */
}
