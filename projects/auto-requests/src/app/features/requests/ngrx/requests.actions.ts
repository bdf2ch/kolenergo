import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IRequest, IRoutePoint } from '../../../interfaces';
import { Request } from '../../../models';

/**
 * Типы действий раздела заявок на автотранспорт
 */
export enum RequestsActionTypes {
  REQUESTS_SELECT_REQUEST = '[Application UI] Select request',
  REQUESTS_LOAD_REQUESTS = '[Requests API] Load requests',
  REQUESTS_LOAD_REQUESTS_SUCCESS = '[Requests API] Requests loaded successfully',
  REQUESTS_LOAD_REQUESTS_FAIL = '[Requests API] Failed to load requests',
  REQUESTS_ADD_REQUEST = '[Requests API] Add request',
  REQUESTS_ADD_REQUEST_SUCCESS = '[Requests API] Request added successfully',
  REQUESTS_ADD_REQUEST_FAIL = '[Requests API] Failed to add request',
  REQUESTS_EDIT_REQUEST = '[Requests API] Edit request',
  REQUESTS_EDIT_REQUEST_SUCCESS = '[Requests API] Changes to request saved successfully',
  REQUESTS_EDIT_REQUEST_FAIL = '[Requests API] Failed to save changes to request'
}

/**
 * Выбор текущей заявки
 */
export class RequestsSelectRequest implements Action {
  readonly type = RequestsActionTypes.REQUESTS_SELECT_REQUEST;
  constructor(public payload: Request) {}
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
}

/**
 * Изменения в заявке успешно сохранены
 */
export class RequestsEditRequestSuccess implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS;
  constructor(public payload: IServerResponse<IRequest>) {}
}

/**
 * Не удалось сохранить изменения в заявке
 */
export class RequestsEditRequestFail implements Action {
  readonly type = RequestsActionTypes.REQUESTS_EDIT_REQUEST_FAIL;
}

/**
 * Множество действий раздела управления заявками
 */
export type RequestsActions =
  RequestsSelectRequest |
  RequestsLoadRequests |
  RequestsLoadRequestsSuccess |
  RequestsLoadRequestsFail |
  RequestsAddRequest |
  RequestsAddRequestSuccess |
  RequestsAddRequestFail |
  RequestsEditRequest |
  RequestsEditRequestSuccess |
  RequestsEditRequestFail;
