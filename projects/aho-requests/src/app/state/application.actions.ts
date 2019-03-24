import { Action } from '@ngrx/store';
import {IAhoRequestsInitialData} from '../aho-requests/interfaces';
import {IServerResponse} from '../../../../kolenergo-core/src/lib/interfaces';
import { SearchFilter } from '../aho-requests/models';

export enum AhoRequestsActionTypes {
  LOAD_INITIAL_DATA = '[AHO Requests] Load initial data',
  INITIAL_DATA_LOAD_SUCCESS = '[AHO Requests] initial data loaded successfully',
  LOAD_REQUESTS = '[AHO Requests] Load requests',
  CHANGE_SEARCH = '[Search] Search changed',
  CLEAR_SEARCH = '[Search] Search cleared',
  CHANGE_FILTERS = '[Filters] Filters changed',
  RESET_FILTERS = '[Filters] Filters reset'
}

export class LoadInitialData implements Action {
  readonly  type = AhoRequestsActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Событие загрузки данных для инициализации приложения
 */
export class InitialDataLoadSuccess implements Action {
  readonly  type = AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS;

  constructor(public payload: IServerResponse<IAhoRequestsInitialData>) {}
}

export class LoadRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_REQUESTS;

  constructor(public payload: {userId: number}) {}
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

export type AhoRequestsActions = LoadInitialData | InitialDataLoadSuccess | LoadRequests;
