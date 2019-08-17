import { Action } from '@ngrx/store';
import { IServerResponse } from '@kolenergo/core';
import { IPortalInitialData } from '../portal/interfaces';
import { IAdvert } from '../adverts/interfaces';

/**
 * Типы действий в приложении
 */
export enum PortalActionTypes {
  LOAD_INITIAL_DATA = '[Portal API] Load application initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[Portal API] Application initial data loaded successfully',
  LOAD_ADVERTS_PREVIOUS_PAGE = '[Portal API] Load previous page of adverts',
  LOAD_ADVERTS_PREVIOUS_PAGE_SUCCESS = '[Portal API] Previous page of adverts loaded successfully',
  LOAD_ADVERTS_NEXT_PAGE = '[Portal API] Load next page of adverts',
  LOAD_ADVERTS_NEXT_PAGE_SUCCESS = '[Portal API] Next page of adverts loaded successfully',
  LOAD_ADVERTS = '[Portal API] Load list of adverts',
  LOAD_ADVERTS_SUCCESS = '[Portal API] List of adverts loaded successfully'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly type = PortalActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполенна успешно
 */
export class LoadInitialDataSuccess implements Action {
  readonly type = PortalActionTypes.LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IPortalInitialData>) {}
}

/**
 * Загрузка предыдущей страницы объявлений
 */
export class LoadAdvertsPreviousPage implements Action {
  readonly type = PortalActionTypes.LOAD_ADVERTS_PREVIOUS_PAGE;
  constructor(public payload: {page: number, advertsOnPage: number}) {}
}

/**
 * Зашрузка предыдущей страницы объявлений выполнена успешно
 */
export class LoadAdvertsPreviousPageSuccess implements Action {
  readonly type = PortalActionTypes.LOAD_ADVERTS_PREVIOUS_PAGE_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

/**
 * Загрузка следующей страницы объявлений
 */
export class LoadAdvertsNextPage implements Action {
  readonly type = PortalActionTypes.LOAD_ADVERTS_NEXT_PAGE;
  constructor(public payload: {page: number, advertsOnPage: number}) {}
}

/**
 * Зашрузка следующей страницы объявлений выполнена успешно
 */
export class LoadAdvertsNextPageSuccess implements Action {
  readonly type = PortalActionTypes.LOAD_ADVERTS_NEXT_PAGE_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

export type portalActions =
  LoadInitialData |
  LoadInitialDataSuccess |
  LoadAdvertsPreviousPage |
  LoadAdvertsPreviousPageSuccess |
  LoadAdvertsNextPage |
  LoadAdvertsNextPageSuccess;
