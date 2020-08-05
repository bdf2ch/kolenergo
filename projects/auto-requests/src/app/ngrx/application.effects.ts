import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { IServerResponse, User } from '@kolenergo/core';
import { ApplicationService } from '../services/application.service';
import { IApplicationState  } from './application.state';
import { ApplicationActionTypes, ApplicationLoadInitialDataSuccess } from './application.actions';
import { selectUser } from './selectors';
import { IAutoRequestsInitialData } from '../interfaces';


@Injectable()
export class ApplicationEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly snackBar: MatSnackBar,
              private readonly application: ApplicationService) {}

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA),
    withLatestFrom(
       this.store.pipe(select(selectUser))
    ),
    switchMap(([action, user]) => this.application.getInitialData(0, 0, (user as User).department.id, (user as User).id)
      .pipe(
        map((response: IServerResponse<IAutoRequestsInitialData>) => new ApplicationLoadInitialDataSuccess(response)),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке данных с сервера произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      )
    )
  );
}
