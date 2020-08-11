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
import { ApplicationActionTypes, ApplicationLoadInitialDataSuccess } from './application.actions';
import { selectUser } from './selectors';
import { IInitialData } from '../interfaces';
import {SignInModalComponent} from '../components/sign-in-modal/sign-in-modal.component';
import {ApplicationsLoadApplicationsSuccess} from '../../../../control/src/app/features/applications/ngrx';


@Injectable()
export class ApplicationEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly application: ApplicationService) {}

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA),
    // withLatestFrom(
    //   this.store.pipe(select(selectUser))
    // ),
    switchMap((action) => this.application.init(0, 0)
      .pipe(
        map((response: IServerResponse<IInitialData>) => new ApplicationLoadInitialDataSuccess(response)),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке данных с сервера произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            duration: 3000
          });
          return EMPTY;
        })
      )
    )
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
    tap(() => {
      this.dialog.open(SignInModalComponent, {
        id: 'sign-in-dialog',
        width: '800px',
        height: '500px',
        panelClass: 'sign-in-dialog'
      });
    }),
    mergeMap(() => EMPTY)
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
