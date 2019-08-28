import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IApplicationInitialData } from '../interfaces';

export enum ApplicationActionTypes {
  LOAD_INITIAL_DATA = '[Press Reports API] Load initial data',
  LOAD_INITIAL_DATA_SUCCESS = '[Press Reports API] Initial data loaded successfully'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class LoadInitialData implements Action {
  readonly type = ApplicationActionTypes.LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполенна успешно
 */
export class LoadInitialDataSuccess implements Action {
  readonly type = ApplicationActionTypes.LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IApplicationInitialData>) {}
}

export type ApplicationActions =
  LoadInitialData |
  LoadInitialDataSuccess;
