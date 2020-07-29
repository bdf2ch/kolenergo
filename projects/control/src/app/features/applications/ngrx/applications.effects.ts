import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import {catchError, map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../../../interfaces';
import { IApplicationState } from '../../../ngrx/application.state';
import {
  ApplicationsActionTypes,
  ApplicationsAddApplication,
  ApplicationsAddApplicationFail, ApplicationsAddApplicationSuccess,
  ApplicationsLoadApplicationsSuccess
} from './applications.actions';
import { ApplicationsService } from '../../../services/applications.service';




@Injectable()
export class ApplicationsEffects {
  constructor(private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly applications: ApplicationsService) {}

  @Effect()
  loadApplications$ = this.actions$.pipe(
    ofType(ApplicationsActionTypes.LOAD_APPLICATIONS),
    switchMap(() => this.applications.getApplications()
      .pipe(
        map((response: IServerResponse<IApplication[]>) => {
          return new ApplicationsLoadApplicationsSuccess(response);
        })
      )
    )
  );

  @Effect()
  addApplication$ = this.actions$.pipe(
    ofType(ApplicationsActionTypes.ADD_APPLICATION),
    mergeMap((action: ApplicationsAddApplication) => this.applications.add(action.payload).pipe(
      map((response: IServerResponse<IApplication>) => new ApplicationsAddApplicationSuccess(response)),
      catchError(() => of(new ApplicationsAddApplicationFail()))
    ))
  );

  @Effect()
  addApplicationSuccess$ = this.actions$.pipe(
    ofType(ApplicationsActionTypes.ADD_APPLICATION_SUCCESS),
    tap(() => {
      this.dialog.getDialogById('add-application-dialog').close();
      this.snackBar.open('Приложение добавлено', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addApplicationFail$ = this.actions$.pipe(
    ofType(ApplicationsActionTypes.ADD_APPLICATION_FAIL),
    tap(() => {
      this.snackBar.open('При добавлении приложения произошла ошибка', 'Закрыть', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      })
    }),
    mergeMap(() => EMPTY)
  );
}
