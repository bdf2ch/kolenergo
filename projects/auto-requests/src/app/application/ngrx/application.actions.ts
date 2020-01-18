import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IAutoRequestsInitialData } from '../../interfaces';

/**
 * Типы действий приложения
 */
export const enum ApplicationActionTypes {
  'APPLICATION_LOAD_INITIAL_DATA' = '[Application API] Load application initial data',
  'APPLICATION_LOAD_INITIAL_DATA_SUCCESS' = '[Application API] Application initial data loaded successfully'
}

/**
 * Загрузка данных с сервера для инициализации приложения
 */
export class ApplicationLoadInitialData implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных с сервера для инициализации приложения выполенна успешно
 */
export class ApplicationLoadInitialDataSuccess implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IAutoRequestsInitialData>) {}
}

export type ApplicationActions =
  ApplicationLoadInitialData |
  ApplicationLoadInitialDataSuccess;
