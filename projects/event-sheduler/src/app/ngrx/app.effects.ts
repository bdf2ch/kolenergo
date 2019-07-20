import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';


import {map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { actionTypes, IServerResponse } from '@kolenergo/core';
import * as state from './';
import {AhoRequestsActionTypes, ResetRequests, selectCurrentUser, selectItemsOnPage} from '../../../../aho-requests/src/app/state';
import {IAhoRequestsInitialData2} from '../../../../aho-requests/src/app/aho-requests/interfaces';
import { EventShedulerService } from '../event-sheduler/services/event-sheduler.service';
import {IEventShedulerInitialData} from '../event-sheduler/interfaces';
import {
  AuthenticationCheck,
  AuthenticationCheckSuccess
} from '../../../../kolenergo-core/src/lib/authentication/state/authentication.actions';


@Injectable()
export class AppEffects {
  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly store: Store<state.IApplicationState>,
              private readonly actions$: Actions,
              private readonly esa: EventShedulerService) {}


  @Effect()
  checkSession$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_CHECK_SUCCESS),
    tap((action: AuthenticationCheckSuccess) => {
      console.log('SESSION CHECK');
    }),
    withLatestFrom(
      this.store.pipe(select(state.selectCurrentUser)),
      this.store.pipe(select(state.selectApplicationInitialized))
    ),
    mergeMap(([action, user, isInitialized]) => {
      if (isInitialized === false) {
        return of(new state.LoadInitialData(user.id));
      } else {
        return EMPTY;
      }
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
      this.store.pipe(select(state.selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return of(new state.LoadInitialData(user.id));
    })
  );

  @Effect()
  signOutSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/welcome']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(state.EventShedulerActionTypes.LOAD_INITIAL_DATA),
    withLatestFrom(
      this.store.pipe(select(state.selectCurrentUser)),
      this.store.pipe(select(state.selectCalendarMode)),
    ),
    mergeMap(([action, user, mode]) => this.esa.fetchInitialData(user.id, mode)
      .pipe(
        map((data: IServerResponse<IEventShedulerInitialData>) => {
          return {type: state.EventShedulerActionTypes.LOAD_INITIAL_DATA_SUCCESS, payload: data};
        })
      )
    )
  );
}
