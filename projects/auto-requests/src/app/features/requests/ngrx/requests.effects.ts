import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as moment from 'moment';

import { IServerResponse } from '@kolenergo/core';
import {
  RequestsActionTypes,
  RequestsAddRequest,
  RequestsAddRequestFail,
  RequestsAddRequestSuccess, RequestsLoadRequests, RequestsLoadRequestsSuccess
} from './requests.actions';
import { IRequest, IRoutePoint } from '../../../interfaces';
import { IApplicationState } from '../../../ngrx/application.state';
import { selectSelectedDate } from '../../../ngrx/selectors';
import { RequestsService } from '../../../services/requests.service';
import { ApplicationActionTypes } from '../../../ngrx';

@Injectable()
export class RequestsEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly requests: RequestsService
  ) {}

  @Effect()
  selectDate$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_SELECT_DATE),
    mergeMap(() => of(new RequestsLoadRequests()))
  );

  @Effect()
  loadRequests$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectSelectedDate))),
    mergeMap(([action, date]) => this.requests.get(
      moment(date as Date).format('DD.MM.YYYY'), 0, 0, 0, 0, null)
      .pipe(
        map((response: IServerResponse<IRequest[]>) => new RequestsLoadRequestsSuccess(response))
      )
    )
  );

  @Effect()
  addRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.ADD_REQUEST),
    mergeMap((action) => this.requests.add((action as RequestsAddRequest).payload)
      .pipe(
        map((response: IServerResponse<{
          requests: IRequest[],
          userRequests: IRequest[],
          calendarRequests: {date: string, count: number}[],
          routes: IRoutePoint[]
        }>) => {
          return new RequestsAddRequestSuccess(response);
        }),
        catchError(() => {
          return of(new RequestsAddRequestFail());
        })
      )
    )
  );

  @Effect()
  addRequestSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.ADD_REQUEST_SUCCESS),
    tap(() => {
      this.dialog.getDialogById('add-request-dialog').close();
      this.snackBar.open('Заявка добавлена', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addRequestFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.ADD_REQUEST_FAIL),
    tap(() => {
      this.snackBar.open('При добавлении заявки произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );
}
