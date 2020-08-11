import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IInitialData } from '../interfaces';
import { EViewMode } from '../enums';

/**
 * Типы действий приложения
 */
export const enum ApplicationActionTypes {
  APPLICATION_LOAD_INITIAL_DATA = '[Auto API] Load application initial data',
  APPLICATION_LOAD_INITIAL_DATA_SUCCESS = '[Auto API] Application initial data loaded successfully',
  APPLICATION_LOAD_INITIAL_DATA_FAIL = '[Auto API] Failed to load application initial data',
  APPLICATION_SELECT_VIEW_MODE = '[Application UI] Select requests view mode',
  APPLICATION_OPEN_SIGN_IN_DIALOG = '[Application UI]Open sign in dialog'
}

/**
 * Загрузка данных для инициализации приложения
 */
export class ApplicationLoadInitialData implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных для инициализации приложения выполенна успешно
 */
export class ApplicationLoadInitialDataSuccess implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IInitialData>) {}
}

/**
 * Не удалось выполнить загрузку данных для инициализации приложения
 */
export class ApplicationLoadInitialDataFail implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_FAIL;
}

/**
 * Выбор режима отображения заявок
 */
export class ApplicationSelectViewMode implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SELECT_VIEW_MODE;
  constructor(public payload: EViewMode) {}
}

/**
 * Открытие диалогового окна авторизации пользователя
 */
export class ApplicationOpenSignInDialog implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_OPEN_SIGN_IN_DIALOG;
}


export type ApplicationActions =
  ApplicationLoadInitialData |
  ApplicationLoadInitialDataSuccess |
  ApplicationLoadInitialDataFail |
  ApplicationSelectViewMode |
  ApplicationOpenSignInDialog;
