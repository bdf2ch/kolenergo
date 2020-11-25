import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IRequest, IRoutePoint } from '../../../interfaces';
import {Driver, Request, Transport} from '../../../models';

/**
 * Типы действий раздела заявок на автотранспорт
 */
export enum RequestsActionTypes {
  REQUESTS_SELECT_REQUEST = '[Application UI] Select request',
  REQUESTS_SELECT_TRANSPORT = '[Application UI] Select transport',
  REQUESTS_LOAD_REQUESTS = '[Requests API] Load requests',
  REQUESTS_LOAD_REQUESTS_SUCCESS = '[Requests API] Requests loaded successfully',
  REQUESTS_LOAD_REQUESTS_FAIL = '[Requests API] Failed to load requests',
  REQUESTS_LOAD_USER_REQUESTS = '[Requests API] Load user requests',
  REQUESTS_LOAD_USER_REQUESTS_SUCCESS = '[Requests API] User requests loaded successfully',
  REQUESTS_LOAD_USER_REQUESTS_FAIL = '[Requests API] Failed to load user requests',
  REQUESTS_LOAD_FILTERED_REQUESTS = '[Requests API] Load filtered requests',
  REQUESTS_LOAD_FILTERED_REQUESTS_SUCCESS = '[Requests API] Filtered requests loaded successfully',
  REQUESTS_LOAD_FILTERED_REQUESTS_FAIL = '[Requests API] Failed to load filtered requests',
  LOAD_BUSY = '[Requests API] Load busy transport and drivers',
  LOAD_BUSY_SUCCESS = '[Requests API] Busy transport and drivers loaded successfully',
  LOAD_BUSY_FAIL = '[Requests API] Failed to load busy transport and drivers',
  REQUESTS_EXPORT_REQUESTS = '[Requests API] Export requests',
  REQUESTS_EXPORT_REQUESTS_SUCCESS = '[Requests API] Requests exported successfully',
  REQUESTS_EXPORT_REQUESTS_FAIL = '[Requests API] Failed to export requests',
  LOAD_TRANSPORT_REPORT = '[Requests API] Load transport report',
  LOAD_TRANSPORT_REPORT_SUCCESS = '[Requests API] Transport report loaded successfully',
  LOAD_TRANSPORT_REPORT_FAIL = '[Requests API] Failed to load transport report',
  LOAD_DRIVER_REPORT = '[Requests API] Load driver report',
  LOAD_DRIVER_REPORT_SUCCESS = '[Requests API] Driver report loaded successfully',
  LOAD_DRIVER_REPORT_FAIL = '[Requests API] Failed to load driver report',
  REQUESTS_ADD_REQUEST = '[Requests API] Add request',
  REQUESTS_ADD_REQUEST_SUCCESS = '[Requests API] Request added successfully',
  REQUESTS_ADD_REQUEST_FAIL = '[Requests API] Failed to add request',
  REQUESTS_EDIT_REQUEST = '[Requests API] Edit request',
  REQUESTS_EDIT_REQUEST_SUCCESS = '[Requests API] Changes to request saved successfully',
  REQUESTS_EDIT_REQUEST_FAIL = '[Requests API] Failed to save changes to request',
  REQUESTS_CANCEL_REQUEST = '[Requests API] Cancel request',
  REQUESTS_CANCEL_REQUEST_SUCCESS = '[Requests API] Request canceled successfully',
  REQUESTS_CANCEL_REQUEST_FAIL = '[Requests API] Failed to cancel request'
}

/**
 * Выбор текущей заявки
 */
export class RequestsSelectRequest implements Action {
  readonly type = RequestsActionTypes.REQUESTS_SELECT_REQUEST;
  constructor(public payload: Request) {}
}

/**
 * Выбор транспорта в текущей заявке
 */
export class RequestsSelectTransport implements Action {
  readonly type = RequestsActionTypes.REQUESTS_SELECT_TRANSPORT;
  constructor(public payload: Transport) {}
}

/**
 * Загрузка заявок на автотранспорт с сервера
 */
export class RequestsLoadRequests implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_REQUESTS;
}

/**
 * Загрузка заявок на автотранапорт с сервера выполенна успешно
 */
export class RequestsLoadRequestsSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_REQUESTS_SUCCESS;
  constructor(public payload: IServerResponse<IRequest[]>) {}
}

/**
 * Не удалось загрузить заявки
 */
export class RequestsLoadRequestsFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_REQUESTS_FAIL;
}

/**
 * Загрузка заявок текущего пользователя
 */
export class RequestsLoadUserRequests implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS;
}

/**
 * Заявки текущего пользователя успешно загружены
 */
export class RequestsLoadUserRequestsSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_SUCCESS;
  constructor(public payload: IServerResponse<IRequest[]>) {}
}

/**
 * Не удалось загрузить заявки текущего пользователя
 */
export class RequestsLoadUserRequestsFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_FAIL;
}

/**
 * Загрузка отфильтрованных заявок
 */
export class RequestsLoadFilteredRequests implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS;
}

/**
 * Загрузка отфильтрованных заявок выполнена успешно
 */
export class RequestsLoadFilteredRequestsSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_SUCCESS;
  constructor(public payload: IServerResponse<IRequest[]>) {}
}

/**
 * Не удалось загрузить отфильтрованные заявки
 */
export class RequestsLoadFilteredRequestsFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_FAIL;
}

/**
 * Загрузка задействованного транспорта по времени поездки
 */
export class LoadBusy implements Action {
  readonly type = RequestsActionTypes.LOAD_BUSY;
  constructor(public payload: { requestId: number, startTime: number, endTime: number }) {}
}

/**
 * Загрузка задействованного транспорта по времени поездки выполнена успешно
 */
export class LoadBusySuccess implements Action {
  readonly type = RequestsActionTypes.LOAD_BUSY_SUCCESS;
  constructor(public payload: IServerResponse<{ transport: number[], drivers: number[] }>) {}
}

/**
 * Не удалось выполнить загрузку задействованного транспорта по времени поездки
 */
export class LoadBusyFail implements Action {
  readonly type = RequestsActionTypes.LOAD_BUSY_FAIL;
}

/**
 * Экспорт заявок
 */
export class RequestsExportRequests implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EXPORT_REQUESTS;
}

/**
 * Экспорт заявок выполнен успешно
 */
export class RequestsExportRequestsSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_SUCCESS;
  constructor(public payload: Blob) {}
}

/**
 * Не удалось выполнить экспорт заявок
 */
export class RequestsExportRequestsFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_FAIL;
}

/**
 * Загрузка отчета об использовании транспорта
 */
export class LoadTransportReport implements Action {
  readonly type = RequestsActionTypes.LOAD_TRANSPORT_REPORT;
  constructor(public payload: {periodStart: number, periodEnd: number, transport: Transport}) {}
}

/**
 * Отчет об использовании транспорта успешно загружен
 */
export class LoadTransportReportSuccess implements Action {
  readonly type = RequestsActionTypes.LOAD_TRANSPORT_REPORT_SUCCESS;
  constructor(public payload: Blob) {}
}

/**
 * Не удалось загрузить отчет об использовании транспорта
 */
export class LoadTransportReportFail implements Action {
  readonly type = RequestsActionTypes.LOAD_TRANSPORT_REPORT_FAIL;
}

/**
 * Загрузка отчета о занятости водителя
 */
export class LoadDriverReport implements Action {
  readonly type = RequestsActionTypes.LOAD_DRIVER_REPORT;
  constructor(public payload: {periodStart: number, periodEnd: number, driver: Driver}) {}
}

/**
 * Отчет о занятости водителя успешно загружен
 */
export class LoadDriverReportSuccess implements Action {
  readonly type = RequestsActionTypes.LOAD_DRIVER_REPORT_SUCCESS;
  constructor(public payload: Blob) {}
}

/**
 * Не удалось загрузить отчет о занятости водителя
 */
export class LoadDriverReportFail implements Action {
  readonly type = RequestsActionTypes.LOAD_DRIVER_REPORT_FAIL;
}

/**
 * Добавление новой заявки
 */
export class RequestsAddRequest implements Action {
  readonly type = RequestsActionTypes.REQUESTS_ADD_REQUEST;
  constructor(public payload: Request) {}
}

/**
 * Добавление новой заявки выполнено успешно
 */
export class RequestsAddRequestSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_ADD_REQUEST_SUCCESS;
  constructor(
    public payload: IServerResponse<{
      requests: IRequest[],
      userRequests: IRequest[],
      calendarRequests: {date: string, count: number}[],
      routes: IRoutePoint[]
    }>
  ) {}
}

/**
 * Не удалось добавить новую заявку
 */
export class RequestsAddRequestFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_ADD_REQUEST_FAIL;
}

/**
 * Сохранение изменений в заявке
 */
export class RequestsEditRequest implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EDIT_REQUEST;
  constructor(public payload: Request) {}
}

/**
 * Изменения в заявке успешно сохранены
 */
export class RequestsEditRequestSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS;
  constructor(public payload: IServerResponse<{
    requests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>) {}
}

/**
 * Не удалось сохранить изменения в заявке
 */
export class RequestsEditRequestFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EDIT_REQUEST_FAIL;
}

/**
 * Отмена заявки
 */
export class RequestsCancelRequest implements Action {
  readonly type = RequestsActionTypes.REQUESTS_CANCEL_REQUEST;
}

/**
 * Заявка успешно отменена
 */
export class RequestsCancelRequestSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_CANCEL_REQUEST_SUCCESS;
  constructor(public payload: IServerResponse<IRequest>) {}
}

/**
 * не удалось отменить заявку
 */
export class RequestsCancelRequestFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_CANCEL_REQUEST_FAIL;
}

/**
 * Множество действий раздела управления заявками
 */
export type RequestsActions =
  RequestsSelectRequest |
  RequestsSelectTransport |
  RequestsLoadRequests |
  RequestsLoadRequestsSuccess |
  RequestsLoadRequestsFail |
  RequestsLoadUserRequests |
  RequestsLoadUserRequestsSuccess |
  RequestsLoadUserRequestsFail |
  RequestsLoadFilteredRequests |
  RequestsLoadFilteredRequestsSuccess |
  RequestsLoadFilteredRequestsFail |
  LoadBusy |
  LoadBusySuccess |
  LoadBusyFail |
  RequestsExportRequests |
  RequestsExportRequestsSuccess |
  RequestsExportRequestsFail |
  LoadTransportReport |
  LoadTransportReportSuccess |
  LoadTransportReportFail |
  LoadDriverReport |
  LoadDriverReportSuccess |
  LoadDriverReportFail |
  RequestsAddRequest |
  RequestsAddRequestSuccess |
  RequestsAddRequestFail |
  RequestsEditRequest |
  RequestsEditRequestSuccess |
  RequestsEditRequestFail |
  RequestsCancelRequest |
  RequestsCancelRequestSuccess |
  RequestsCancelRequestFail;
