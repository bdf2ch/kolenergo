import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { actionTypes, IServerResponse, AuthenticationCheckSuccess } from '@kolenergo/core';
import { IApplicationState } from './application.state';
import { ApplicationActionTypes, LoadInitialData, LoadInitialDataSuccess } from './application.actions';
import { selectCurrentUser } from './application.selectors';
import { ApplicationService } from '../services/application.service';
import { IApplicationInitialData } from '../interfaces';

@Injectable()
export class ApplicationEffects {
  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly application: ApplicationService) {}


  @Effect()
  checkSessionSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_CHECK_SUCCESS),
    mergeMap(() => {
        return of(new LoadInitialData());
    })
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('sign-in-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return of(new LoadInitialData());
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
    ofType(ApplicationActionTypes.LOAD_INITIAL_DATA),
    mergeMap(() => this.application.getInitialData()
      .pipe(
        map((response: IServerResponse<IApplicationInitialData>) => {
          return new LoadInitialDataSuccess(response);
        })
      )
    )
  );
}
