import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {actionTypes, AuthenticationSignInSuccess, IServerResponse, User} from '@kolenergo/core';
import { ApplicationService } from '../services/application.service';
import { IApplicationState  } from './application.state';
import {
  ApplicationActionTypes, ApplicationCloseSidebar, ApplicationLoadInitialDataFail,
  ApplicationLoadInitialDataSuccess,
  ApplicationOpenAddRequestDialog, ApplicationOpenSidebar,
  ApplicationOpenSignInDialog, ApplicationSetCompactMode
} from './application.actions';
import {selectCalendarPeriodEnd, selectCalendarPeriodStart, selectUser} from './selectors';
import { IInitialData } from '../interfaces';
import {SignInModalComponent} from '../components/sign-in-modal/sign-in-modal.component';
import {ApplicationsLoadApplicationsSuccess} from '../../../../control/src/app/features/applications/ngrx';
import {AddRequestDialogComponent} from '../components/add-request-dialog/add-request-dialog.component';


@Injectable()
export class ApplicationEffects {
  constructor(
    private readonly router: Router,
    private readonly store: Store<IApplicationState>,
    private readonly actions$: Actions,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
    private readonly application: ApplicationService
  ) {
  }

  @Effect()
  setCompactMode$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_SET_COMPACT_MODE),
    mergeMap((action) => {
      return (action as ApplicationSetCompactMode).payload === true
        ? of(new ApplicationCloseSidebar())
        : of(new ApplicationOpenSidebar());
    })
  );

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA),
    switchMap(() => this.application.init()
      .pipe(
        map((response: IServerResponse<IInitialData>) => new ApplicationLoadInitialDataSuccess(response)),
        catchError((error: any) => {
          return of(new ApplicationLoadInitialDataFail());
        })
      )
    )
  );

  @Effect()
  loadInitialDataFail$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке данных с сервера произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadInitialDataSuccess$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS),
    mergeMap((action) => {
      return (action as ApplicationLoadInitialDataSuccess).payload.data.user
        ? of(new AuthenticationSignInSuccess((action as ApplicationLoadInitialDataSuccess).payload.data.user))
        : EMPTY;
    })
  );

  @Effect()
  openSignInDialog$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_OPEN_SIGN_IN_DIALOG),
    tap((action) => {
      this.dialog.open(SignInModalComponent, {
        id: 'sign-in-dialog',
        width: '800px',
        height: '500px',
        panelClass: 'sign-in-dialog',
        data: {
          fromAddRequestDialog: (action as ApplicationOpenSignInDialog).payload
        }
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  openAddRequestDialog$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_OPEN_ADD_REQUEST_DIALOG),
    withLatestFrom(this.store.pipe(select(selectUser))),
    tap(([action, user]) => {
      if (user) {
        this.dialog.open(AddRequestDialogComponent, {
          id: 'add-request-dialog',
          width: '1050px',
          height: '500px',
          panelClass: 'sign-in-dialog'
        });
      }
    }),
    mergeMap(([action, user]) => user ? EMPTY : of(new ApplicationOpenSignInDialog(true)))
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
    mergeMap(() => EMPTY)
  );
}
