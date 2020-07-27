import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationService } from '../services/application.service';
import { IInitialData } from '../interfaces';
import { IApplicationState } from './application.state';
import { ApplicationLoadInitialDataFail, ApplicationLoadInitialDataSuccess, EApplicationActions } from './application.actions';
import { selectMenu } from './application.selectors';


@Injectable({
  providedIn: 'root'
})
export class ApplicationEffects {

  constructor(
    private readonly actions: Actions,
    private readonly store: Store<IApplicationState>,
    private readonly snackBar: MatSnackBar,
    private readonly application: ApplicationService
  ) {}

  @Effect()
  routerNavigated$ = this.actions.pipe(
    ofType(ROUTER_NAVIGATED),
    withLatestFrom(this.store.pipe(select(selectMenu))),
    mergeMap(([action, menu]) => EMPTY)
  );

  @Effect()
  loadInitialData$ = this.actions.pipe(
    ofType(EApplicationActions.APPLICATION_LOAD_INITIAL_DATA),
    mergeMap(() => this.application.init().pipe(
      map((response: IServerResponse<IInitialData>) => new ApplicationLoadInitialDataSuccess(response)),
      catchError(() => of(new ApplicationLoadInitialDataFail()))
    ))
  );

  @Effect()
  loadInitialDataFail$ = this.actions.pipe(
    ofType(EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке данных произошла ошибка', 'Закрыть', {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        duration: 5000
      });
    }),
    mergeMap(() => EMPTY)
  );
}
