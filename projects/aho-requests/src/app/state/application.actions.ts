import { Action } from '@ngrx/store';
import { IAhoRequest, IAhoRequestsInitialData } from '../aho-requests/interfaces';
import { IServerResponse } from '../../../../kolenergo-core/src/lib/interfaces';
import { SearchFilter } from '../aho-requests/models';
import { ApplicationModes } from './application.state';

export enum AhoRequestsActionTypes {
  LOAD_ALL_REQUESTS = '[AHO Requests API] Load all requests',
  LOAD_ALL_REQUESTS_SUCCESS = '[AHO Requests API] All requests loaded successfully',
  LOAD_OWN_REQUESTS = '[AHO Requests API] Load own requests',
  LOAD_OWN_REQUESTS_SUCCESS = '[AHO Requests API] Own requests loaded successfully',
  LOAD_EMPLOYEE_REQUESTS = '[AHO Requests API] Load employee requests',
  LOAD_EMPLOYEE_REQUESTS_SUCCESS = '[AHO Requests API] Employee requests loaded successfully',
  LOAD_EXPIRED_REQUESTS = '[AHO Requests API] Load expired requests',
  LOAD_EXPIRED_REQUESTS_SUCCESS = '[AHO Requests API] Expired requests loaded successfully',
  SET_CURRENT_PAGE = '[AHO Requests] Set current page',
  SELECT_REQUESTS_MODE = '[AHO Requests] Requests mode change',
  LOAD_INITIAL_DATA = '[AHO Requests API] Load initial data',
  INITIAL_DATA_LOAD_SUCCESS = '[AHO Requests API] Initial data loaded successfully',
  LOAD_REQUESTS = '[AHO Requests API] Load requests',
  LOAD_REQUESTS_SUCCESS = '[AHO Requests API] Requests loaded successfully',
  CHANGE_SEARCH = '[Search] Search changed',
  CLEAR_SEARCH = '[Search] Search cleared',
  OPEN_FILTERS_DIALOG = '[Filters] Open filters dialog',
  CLOSE_FILTERS_DIALOG = '[Filters] Close filters dialog',
  APPLY_FILTERS = '[Filters] Filters changed',
  FILTERED_REQUESTS_LOAD_SUCCESS = '[AHO Requests API] Filtered requests loaded successfully',
  RESET_FILTERS = '[Filters] Filters reset'
}

/**
 * Загрузка всех заявок
 */
export class LoadAllRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_ALL_REQUESTS;
}

/**
 * Все заявки успешно загружены
 */
export class LoadAllRequestsSuccess implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_ALL_REQUESTS_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number, newRequestsCount: number}>) {}
}

/**
 * Загрузка собственных заявок
 */
export class LoadOwnRequests implements Action {
  readonly  type = AhoRequestsActionTypes.LOAD_OWN_REQUESTS;
}

/**
 * Собственные заявки успешно загружены
 */
export class LoadOwnRequestsSuccess implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_OWN_REQUESTS_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) {}
}

/**
 * Загрузка заявок, где пользователь является исполнителем
 */
export class LoadEmployeeRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS;
}

/**
 * Заявки, где пользователь является исполнителем успешно загружены
 */
export class LoadEmployeeRequestsSuccess implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) {}
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

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) {}
}

/**
 * Установка текущей страницы
 */
export class SetCurrentPage implements Action {
  readonly type = AhoRequestsActionTypes.SET_CURRENT_PAGE;

  constructor(public payload: number) {}
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
 * Открытие диалогового окна с фильтрами
 */
export class OpenFiltersDialog implements Action {
  readonly type = AhoRequestsActionTypes.OPEN_FILTERS_DIALOG;
}

/**
 * Закрытие диалогового окна с фильтрами
 */
export class CloseFiltersDialog implements Action {
  readonly  type = AhoRequestsActionTypes.CLOSE_FILTERS_DIALOG;
}

/**
 * Событие изменения примененных фильтров
 */
export class ApplyFilters implements Action {
  readonly type = AhoRequestsActionTypes.APPLY_FILTERS;

  constructor(public payload: SearchFilter<any>[]) {}
}

/**
 * Отфильтрованные заявки успешно загружены
 */
export class FilteredRequestsLoadedSuccess implements Action {
  readonly type = AhoRequestsActionTypes.FILTERED_REQUESTS_LOAD_SUCCESS;

  constructor(public payload: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) {}
}

/**
 * Событие сброса примененных фильтров
 */
export class ResetFilters implements Action {
  readonly  type = AhoRequestsActionTypes.RESET_FILTERS;
}


export type AhoRequestsActions =
  LoadAllRequests |
  LoadAllRequestsSuccess |
  LoadOwnRequests |
  LoadOwnRequestsSuccess |
  LoadExpiredRequests |
  LoadEmployeeRequestsSuccess |
  LoadEmployeeRequests |
  LoadExpiredRequestsSuccess |
  SetCurrentPage |
  LoadRequestsSuccess |
  SelectRequestsMode |
  LoadInitialData |
  InitialDataLoadSuccess |
  LoadRequests |
  LoadRequestsSuccess |
  ApplyFilters |
  FilteredRequestsLoadedSuccess |
  ResetFilters;
