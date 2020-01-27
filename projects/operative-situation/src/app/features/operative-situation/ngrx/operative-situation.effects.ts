import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

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
  LoadReportsByCompany
} from './operative-situation.actions';
import { OperativeSituationService } from '../../../services/operative-situation.service';
import { IApplicationState } from '../../../ngrx';
import { IAppInitData, IReportSummary } from '../../../interfaces';
import { selectSelectedCompany, selectSelectedDivision } from './selectors';

@Injectable()
export class OperativeSituationEffects {
  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
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
  selectCompany$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.SELECT_COMPANY),
    mergeMap(() => of(new LoadReportsByCompany()))
  );

  @Effect()
  selectDivision$ = this.actions$.pipe(
    ofType(OperativeSituationActionTypes.SELECT_DIVISION),
    mergeMap(() => of(new LoadReportsByDivision()))
  );
}
