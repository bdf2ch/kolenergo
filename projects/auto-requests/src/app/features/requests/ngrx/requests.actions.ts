import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IRequest } from '../../../interfaces';

/**
 * Типы действий раздела заявок на автотранспорт
 */
export enum RequestsActionTypes {
  REQUESTS_LOAD_REQUESTS = '[Requests API] Load requests',
  REQUESTS_LOAD_REQUESTS_SUCCESS = '[Requests API] Requests loaded successfully'
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

export type RequestsActions =
  RequestsLoadRequests |
  RequestsLoadRequestsSuccess;
