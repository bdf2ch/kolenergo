import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IRequest, IRoutePoint } from '../../../interfaces';
import { Request } from '../../../models';

/**
 * Типы действий раздела заявок на автотранспорт
 */
export enum RequestsActionTypes {
  REQUESTS_LOAD_REQUESTS = '[Requests API] Load requests',
  REQUESTS_LOAD_REQUESTS_SUCCESS = '[Requests API] Requests loaded successfully',
  REQUESTS_LOAD_REQUESTS_FAIL = '[Requests API] Failed to load requests',
  ADD_REQUEST = '[Requests API] Add request',
  ADD_REQUEST_SUCCESS = '[Requests API] Request added successfully',
  ADD_REQUEST_FAIL = '[Requests API] Failed to add request'
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
  readonly type = RequestsActionTypes.ADD_REQUEST;
  constructor(public payload: Request) {}
}

/**
 * Добавление новой заявки выполнено успешно
 */
export class RequestsAddRequestSuccess implements Action {
  readonly type = RequestsActionTypes.ADD_REQUEST_SUCCESS;
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
  readonly type = RequestsActionTypes.ADD_REQUEST_FAIL;
}

/**
 * Множество действий раздела управления заявками
 */
export type RequestsActions =
  RequestsLoadRequests |
  RequestsLoadRequestsSuccess |
  RequestsLoadRequestsFail |
  RequestsAddRequest |
  RequestsAddRequestSuccess |
  RequestsAddRequestFail;
