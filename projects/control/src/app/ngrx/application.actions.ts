import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IInitialData } from '../interfaces';

/**
 * Множество действий приложения
 */
export enum EApplicationActions {
  APPLICATION_LOAD_INITIAL_DATA = '[Application API] Load application initial data',
  APPLICATION_LOAD_INITIAL_DATA_SUCCESS = '[Application API] Application initial data successfully loaded',
  APPLICATION_LOAD_INITIAL_DATA_FAIL = '[Application API] Failed to load application initial data'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class ApplicationLoadInitialData implements Action {
  readonly type = EApplicationActions.APPLICATION_LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполнена успешно
 */
export class ApplicationLoadInitialDataSuccess implements Action {
  readonly type = EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IInitialData>) {}
}

/**
 * Не удалось выполнить загрузку данных для инициализации приложения
 */
export class ApplicationLoadInitialDataFail implements Action {
  readonly type = EApplicationActions.APPLICATION_LOAD_INITIAL_DATA_FAIL;
}

/**
 * Составной тип действий приложения
 */
export type ApplicationActions =
  ApplicationLoadInitialData |
  ApplicationLoadInitialDataSuccess |
  ApplicationLoadInitialDataFail;
