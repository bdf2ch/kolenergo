import { Action } from '@ngrx/store';
import {IAhoRequest, IAhoRequestsInitialData} from '../aho-requests/interfaces';
import {IServerResponse} from '../../../../kolenergo-core/src/lib/interfaces';
import { SearchFilter } from '../aho-requests/models';
import { ApplicationModes } from './application.state';

export enum AhoRequestsActionTypes {
  LOAD_EXPIRED_REQUESTS = '[AHO Requests API] Show expired requests',
  LOAD_EXPIRED_REQUESTS_SUCCESS = '[AHO Requests API] Expired requests loaded successfully',
  SELECT_REQUESTS_MODE = '[AHO Requests] Requests mode change',
  LOAD_INITIAL_DATA = '[AHO Requests API] Load initial data',
  INITIAL_DATA_LOAD_SUCCESS = '[AHO Requests API] initial data loaded successfully',
  LOAD_REQUESTS = '[AHO Requests API] Load requests',
  LOAD_REQUESTS_SUCCESS = '[AHO Requests API] Requests loaded successfully',
  LOAD_NEXT_PAGE = '[AHO Requests] Load next page of requests',
  CHANGE_SEARCH = '[Search] Search changed',
  CLEAR_SEARCH = '[Search] Search cleared',
  CHANGE_FILTERS = '[Filters] Filters changed',
  RESET_FILTERS = '[Filters] Filters reset'
}

/**
 * Загрузка просроченных заявок
 */
export class LoadExpiredRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS;
}

/**
 * Просроченные заявки успешно загружены
 */
export class LoadExpiredRequestsSuccess implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequest: number}>) {}
}

/**
 * Событие выбора режима отображения заявок
 */
export class SelectRequestsMode implements Action {
  readonly type = AhoRequestsActionTypes.SELECT_REQUESTS_MODE;

  constructor(public payload: ApplicationModes) {}
}

/**
 * Событие загрузки данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly  type = AhoRequestsActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Событие успешной загрузки данных для инициализации приложения
 */
export class InitialDataLoadSuccess implements Action {
  readonly  type = AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS;

  constructor(public payload: IServerResponse<IAhoRequestsInitialData>) {}
}

/**
 * Событие загрузки информации о заявках
 */
export class LoadRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_REQUESTS;
}

/**
 * Событие успешной загрузки информации о заявках
 */
export class LoadRequestsSuccess implements Action {
  readonly  type = AhoRequestsActionTypes.LOAD_REQUESTS_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number, page: number}>) {}
}

/**
 * Событие изменения поля поиска заявок
 */
export class ChangeSearch implements Action {
  readonly  type = AhoRequestsActionTypes.CHANGE_SEARCH;

  constructor(public payload: string) {}
}

/**
 * Событие очистки поля поиска заявок
 */
export class ClearSearch implements Action {
  readonly type = AhoRequestsActionTypes.CLEAR_SEARCH;
}

/**
 * Событие изменения примененных фильтров
 */
export class ChangeFilters implements Action {
  readonly type = AhoRequestsActionTypes.CHANGE_FILTERS;

  constructor(public payload: SearchFilter<any>[]) {}
}

/**
 * Событие сброса примененных фильтров
 */
export class ResetFilters implements Action {
  readonly  type = AhoRequestsActionTypes.RESET_FILTERS;
}

export type AhoRequestsActions =
  LoadExpiredRequests |
  LoadRequestsSuccess |
  SelectRequestsMode |
  LoadInitialData |
  InitialDataLoadSuccess |
  LoadRequests |
  LoadRequestsSuccess;
