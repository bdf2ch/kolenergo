import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import {actionTypes, IServerResponse, AuthenticationCheckSuccess, AuthenticationSignInSuccess} from '@kolenergo/core';
import {
  OperativeSituationActionTypes,
  LoadInitialData,
  LoadInitialDataSuccess,
  LoadInitialDataFail,
  NavigateToSignInPage
} from './operative-situation.actions';
import { OperativeSituationService } from '../../../services/operative-situation.service';
import { IApplicationState } from '../../../ngrx';
import { IAppInitData } from '../../../interfaces';

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
      const dialog = this.dialog.getDialogById('sign-in-dialog');
      if (dialog) {
        dialog.close();
      }
      this.router.navigate(['/']);
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
}
