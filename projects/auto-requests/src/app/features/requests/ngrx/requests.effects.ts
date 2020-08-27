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
  RequestsAddRequestSuccess,
  RequestsEditRequest,
  RequestsEditRequestFail,
  RequestsEditRequestSuccess,
  RequestsLoadRequests,
  RequestsLoadRequestsFail,
  RequestsLoadRequestsSuccess
} from './requests.actions';
import { IRequest, IRoutePoint } from '../../../interfaces';
import { Request } from '../../../models';
import { IApplicationState } from '../../../ngrx/application.state';
import { selectCalendarPeriodEnd, selectCalendarPeriodStart, selectSelectedDate } from '../../../ngrx/selectors';
import { selectSelectedRequest } from './requests.selectors';
import { RequestsService } from '../../../services/requests.service';
import {
  ApplicationActionTypes,
  ApplicationLoadCalendarRequests,
  ApplicationLoadCalendarRequestsFail,
  ApplicationLoadCalendarRequestsSuccess
} from '../../../ngrx/application.actions';
import { EditRequestDialogComponent } from '../../../components/edit-request-dialog/edit-request-dialog.component';

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
  selectRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_SELECT_REQUEST),
    withLatestFrom(this.store.pipe(select(selectSelectedRequest))),
    tap(([action, request]) => {
      this.dialog.open(EditRequestDialogComponent, {
        id: 'edit-request-dialog',
        width: '1050px',
        height: (request as Request).initiator ? '590px' : '500px',
        panelClass: 'sign-in-dialog'
      });
    }),
    mergeMap(() => EMPTY)
  );

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
      moment(date as Date).format('DD.MM.YYYY'), 0, 0, 0, 0, '')
      .pipe(
        map((response: IServerResponse<IRequest[]>) => new RequestsLoadRequestsSuccess(response)),
        catchError((error: any) => {
          return of(new RequestsLoadRequestsFail());
        })
      )
    )
  );

  @Effect()
  loadRequestsFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_REQUESTS_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке заявок произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadCalendarNotifications$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS),
    mergeMap((action) => this.requests.getNotifications(
        (action as ApplicationLoadCalendarRequests).payload.start,
        (action as ApplicationLoadCalendarRequests).payload.end
      ).pipe(
      map((response: IServerResponse<{ date: string, count: number }[]>) => new ApplicationLoadCalendarRequestsSuccess(response)),
      catchError((error: any) => {
        return of(new ApplicationLoadCalendarRequestsFail());
      })
      )
    )
  );

  @Effect()
  loadCalendarNotificationsFail$ = this.actions$.pipe(
    ofType(ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке данных произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  addRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_ADD_REQUEST),
    withLatestFrom(
      this.store.pipe(select(selectSelectedDate)),
      this.store.pipe(select(selectCalendarPeriodStart)),
      this.store.pipe(select(selectCalendarPeriodEnd))
    ),
    mergeMap(([action, date, periodStart, periodEnd]) => this.requests.add(
      (action as RequestsAddRequest).payload,
      moment(date).format('DD.MM.YYYY'),
      periodStart,
      periodEnd
      )
        .pipe(
          map((response: IServerResponse<{
            requests: IRequest[],
            userRequests: IRequest[],
            calendarRequests: { date: string, count: number }[],
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
    ofType(RequestsActionTypes.REQUESTS_ADD_REQUEST_SUCCESS),
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
    ofType(RequestsActionTypes.REQUESTS_ADD_REQUEST_FAIL),
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

  @Effect()
  editRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EDIT_REQUEST),
    withLatestFrom(
      this.store.pipe(select(selectCalendarPeriodStart)),
      this.store.pipe(select(selectCalendarPeriodEnd)),
      this.store.pipe(select(selectSelectedDate))
    ),
    mergeMap(([action, periodStart, periodEnd, currentDate]) => {
      return this.requests.edit(
        (action as RequestsEditRequest).payload,
        periodStart,
        periodEnd,
        moment(currentDate).format('DD.MM.YYYY')
      ).pipe(
        map((response: IServerResponse<{
          requests: IRequest[],
          calendarRequests: { date: string, count: number }[],
          routes: IRoutePoint[]
        }>) => {
          return new RequestsEditRequestSuccess(response);
        }),
        catchError(() => of(new RequestsEditRequestFail()))
      );
    })
  );

  @Effect()
  editRequestSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS),
    tap(() => {
      this.dialog.getDialogById('edit-request-dialog').close();
      this.snackBar.open('Изменения сохранены', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  editRequestFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EDIT_REQUEST_FAIL),
    tap(() => {
      this.snackBar.open('При сохранении изменений произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );
}
