import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import * as saver from 'file-saver';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import * as moment from 'moment';

import { IServerResponse } from '@kolenergo/core';
import {
  RequestsActionTypes,
  RequestsAddRequest,
  RequestsAddRequestFail,
  RequestsAddRequestSuccess,
  RequestsCancelRequest,
  RequestsCancelRequestFail,
  RequestsCancelRequestSuccess,
  RequestsEditRequest,
  RequestsEditRequestFail,
  RequestsEditRequestSuccess,
  RequestsExportRequestsFail,
  RequestsExportRequestsSuccess,
  LoadBusy,
  LoadBusyFail,
  LoadBusySuccess,
  RequestsLoadFilteredRequestsFail,
  RequestsLoadFilteredRequestsSuccess,
  RequestsLoadRequests,
  RequestsLoadRequestsFail,
  RequestsLoadRequestsSuccess,
  RequestsLoadUserRequestsFail,
  RequestsLoadUserRequestsSuccess,
  LoadTransportReport,
  LoadTransportReportSuccess,
  LoadTransportReportFail,
  LoadDriverReport, LoadDriverReportSuccess, LoadDriverReportFail
} from './requests.actions';
import { IRequest, IRoutePoint } from '../../../interfaces';
import { IApplicationState } from '../../../ngrx/application.state';
import {
  selectCalendarPeriodEnd,
  selectCalendarPeriodStart,
  selectFilters, selectListMode,
  selectSearch,
  selectSelectedDate,
  selectUser
} from '../../../ngrx/selectors';
import { selectSelectedRequest } from './requests.selectors';
import { RequestsService } from '../../../services/requests.service';
import {
  ApplicationActionTypes,
  ApplicationLoadCalendarRequests,
  ApplicationLoadCalendarRequestsFail,
  ApplicationLoadCalendarRequestsSuccess
} from '../../../ngrx/application.actions';
import { EditRequestDialogComponent } from '../../../components/edit-request-dialog/edit-request-dialog.component';
import { EListMode } from '../../../enums';
import { RequestDetailsDialogComponent } from '../../../components/request-details-dialog/request-details-dialog.component';
import { ReportsService } from '../../../services/reports.service';

@Injectable()
export class RequestsEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly dialog: MatDialog,
              private readonly snackBar: MatSnackBar,
              private readonly requests: RequestsService,
              private readonly reports: ReportsService
  ) {}

  @Effect()
  selectRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_SELECT_REQUEST),
    withLatestFrom(
      this.store.pipe(select(selectSelectedRequest)),
      this.store.pipe(select(selectUser))
    ),
    tap(([action, request, user]) => {
      if (user) {
        if (user.permissions.getRoleById(20)) {
          this.dialog.open(EditRequestDialogComponent, {
            id: 'edit-request-dialog',
            width: '900px',
            height: '800px',
            panelClass: 'sign-in-dialog'
          });
        } else {
          this.dialog.open(RequestDetailsDialogComponent, {
            id: 'request-details-dialog',
            width: '850px',
            height: request.user.id !== user.id || (request.user.id === user.id && request.status.id === 3) ? '600px' : '700px',
            panelClass: 'sign-in-dialog'
          });
        }
      } else {
        this.dialog.open(RequestDetailsDialogComponent, {
          id: 'request-details-dialog',
          width: '850px',
          height: '600px',
          panelClass: 'sign-in-dialog'
        });
      }
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
      moment(date).startOf('day').unix() * 1000,
      moment(date).endOf('day').unix() * 1000,
      0,
      0,
      0,
      0,
      ''
      ).pipe(
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
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadUserRequests$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectUser))),
    mergeMap(([action, user]) => this.requests.get(
      0, 0, 0, 0, 0, user.id, '')
      .pipe(
        map((response: IServerResponse<IRequest[]>) => new RequestsLoadUserRequestsSuccess(response)),
        catchError((error: any) => {
          return of(new RequestsLoadUserRequestsFail());
        })
      ))
  );

  @Effect()
  loadUserRequestsSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_SUCCESS),
    withLatestFrom(
      this.store.pipe(select(selectCalendarPeriodStart)),
      this.store.pipe(select(selectCalendarPeriodEnd))
    ),
    mergeMap(([action, start, end]) => of(
      new ApplicationLoadCalendarRequests({
        start,
        end
      })
    ))
  );

  @Effect()
  loadUserRequestsFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке заявок произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadFilteredRequests$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS),
    withLatestFrom(
      this.store.pipe(select(selectFilters)),
      this.store.pipe(select(selectSearch))
    ),
    mergeMap(([action, filters, search]) => this.requests.get(
      filters.getFilterById('startDate').getValue()
        ? moment(filters.getFilterById('startDate').getValue()).startOf('day').unix() * 1000
        : 0,
      filters.getFilterById('endDate').getValue()
        ? moment(filters.getFilterById('endDate').getValue()).endOf('day').unix() * 1000
        : 0,
      filters.getFilterById('status').getValue() ? filters.getFilterById('status').getValue().id : 0,
      filters.getFilterById('transport').getValue() ? filters.getFilterById('transport').getValue().id : 0,
      filters.getFilterById('driver').getValue() ? filters.getFilterById('driver').getValue().id : 0,
      filters.getFilterById('user').getValue() ? filters.getFilterById('user').getValue().id : 0,
      search
      ).pipe(
      map((response: IServerResponse<IRequest[]>) => new RequestsLoadFilteredRequestsSuccess(response)),
      catchError((error: any) => {
        return of(new RequestsLoadFilteredRequestsFail());
      })
      )
    )
  );

  @Effect()
  loadFilteredRequestsFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке заявок произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadBusy = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_BUSY),
    mergeMap((action) => this.requests.getBusy(
      (action as LoadBusy).payload.requestId,
      (action as LoadBusy).payload.startTime,
      (action as LoadBusy).payload.endTime,
    ).pipe(
      map((response: IServerResponse<{transport: number[], drivers: number[]}>) => new LoadBusySuccess(response)),
      catchError((error: any) => {
        return of(new LoadBusyFail());
      })
    ))
  );

  @Effect()
  loadRequestsByTransportAndTimeFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_BUSY_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке заявок произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
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
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  exportRequests$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EXPORT_REQUESTS),
    withLatestFrom(
      this.store.pipe(select(selectListMode)),
      this.store.pipe(select(selectSelectedDate)),
      this.store.pipe(select(selectFilters)),
      this.store.pipe(select(selectUser)),
      this.store.pipe(select(selectSearch))
    ),
    mergeMap(([action, mode, date, filters, user, search]) => this.requests.export(
      mode === EListMode.ALL_REQUESTS
        ? moment(date).startOf('day').unix() * 1000
        : mode === EListMode.USER_REQUESTS
          ? 0
          : filters.getFilterById('startDate').getValue()
            ? moment(filters.getFilterById('startDate').getValue()).startOf('day').unix() * 1000
            : 0,
      mode === EListMode.ALL_REQUESTS
        ? moment(date).endOf('day').unix() * 1000
        : mode === EListMode.USER_REQUESTS
        ? 0
        : filters.getFilterById('endDate').getValue()
          ? moment(filters.getFilterById('endDate').getValue()).endOf('day').unix() * 1000
          : 0,
      mode === EListMode.ALL_REQUESTS || mode === EListMode.USER_REQUESTS
        ? 0
        : filters.getFilterById('status').getValue()
          ? filters.getFilterById('status').getValue().id
          : 0,
      mode === EListMode.ALL_REQUESTS || mode === EListMode.USER_REQUESTS
        ? 0
        : filters.getFilterById('transport').getValue()
        ? filters.getFilterById('transport').getValue().id
        : 0,
      mode === EListMode.ALL_REQUESTS || mode === EListMode.USER_REQUESTS
        ? 0
        : filters.getFilterById('driver').getValue()
        ? filters.getFilterById('driver').getValue().id
        : 0,
      mode === EListMode.ALL_REQUESTS
        ? 0
        : mode === EListMode.USER_REQUESTS
          ? user.id
          : mode === EListMode.FILTERED_REQUESTS
            ? filters.getFilterById('user').getValue()
              ? filters.getFilterById('user').getValue().id
              : 0
            : 0,
      mode === EListMode.ALL_REQUESTS || mode === EListMode.USER_REQUESTS ? '' : search
    ).pipe(
      map((response: Blob) => new RequestsExportRequestsSuccess(response)),
      catchError(() => of(new RequestsExportRequestsFail()))
    ))
  );

  @Effect()
  exportRequestsSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_SUCCESS),
    tap((action) => {
      saver.saveAs((action as RequestsExportRequestsSuccess).payload, `Заявки на автотранспорт.xlsx`);
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  exportRequestsFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_FAIL),
    tap(() => {
      this.snackBar.open('При экспорте заявок произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
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
      date,
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
        horizontalPosition: 'right',
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
        horizontalPosition: 'right',
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
        currentDate
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
        horizontalPosition: 'right',
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
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  cancelRequest$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_CANCEL_REQUEST),
    withLatestFrom(this.store.pipe(select(selectSelectedRequest))),
    mergeMap(([action, request]) => this.requests.cancel(request.id)
      .pipe(
        map((response: IServerResponse<IRequest>) => new RequestsCancelRequestSuccess(response)),
        catchError(() => of(new RequestsCancelRequestFail()))
      )
    )
  );

  @Effect()
  cancelRequestSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_CANCEL_REQUEST_SUCCESS),
    tap(() => {
      this.snackBar.open('Заявка отменена', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  cancelRequestFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.REQUESTS_CANCEL_REQUEST_FAIL),
    tap(() => {
      this.snackBar.open('При отмене заявки возникли ошибки', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadTransportReport$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_TRANSPORT_REPORT),
    mergeMap((action: LoadTransportReport) => this.reports.loadTransportReport(
      action.payload.periodStart,
      action.payload.periodEnd,
      action.payload.transport.id
    ).pipe(
      map((response: Blob) => new LoadTransportReportSuccess(response)),
      catchError(() => of(new LoadTransportReportFail()))
    ))
  );

  @Effect()
  loadTransportReportSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_TRANSPORT_REPORT_SUCCESS),
    tap((action) => {
      saver.saveAs((action as LoadTransportReportSuccess).payload, `Отчет об использовании транспорта.xlsx`);
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadTransportReportFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_TRANSPORT_REPORT_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке отчета произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadDriverReport$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_DRIVER_REPORT),
    mergeMap((action: LoadDriverReport) => this.reports.loadDriverReport(
      action.payload.periodStart,
      action.payload.periodEnd,
      action.payload.driver.id
    ).pipe(
      map((response: Blob) => new LoadDriverReportSuccess(response)),
      catchError(() => of(new LoadDriverReportFail()))
    ))
  );

  @Effect()
  loadDriverReportSuccess$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_DRIVER_REPORT_SUCCESS),
    tap((action) => {
      saver.saveAs((action as LoadDriverReportSuccess).payload, `Отчет о занятости водителя.xlsx`);
    }),
    mergeMap(() => EMPTY)
  );

  @Effect()
  loadDriverReportFail$ = this.actions$.pipe(
    ofType(RequestsActionTypes.LOAD_DRIVER_REPORT_FAIL),
    tap(() => {
      this.snackBar.open('При загрузке отчета произошла ошибка', null, {
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'message-snack-bar',
        duration: 3000
      });
    }),
    mergeMap(() => EMPTY)
  );
}
