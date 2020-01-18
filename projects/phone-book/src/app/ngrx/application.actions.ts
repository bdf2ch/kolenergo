import { Action } from '@ngrx/store';

import { IServerResponse } from '@kolenergo/core';
import { IInitialData } from '../interfaces';
import {EApplicationMode, EViewMode} from '../enums';


/**
 * Типы действий телефонного справочника
 */
export enum PhoneBookActionTypes {
  PHONE_BOOK_LOAD_INITIAL_DATA = '[Phone book API] Load initial data',
  PHONE_BOOK_LOAD_INITIAL_DATA_SUCCESS = '[Phone book API] Initial data loaded successfully',
  PHONE_BOOK_SET_VIEW_MODE = '[UI] Set application view mode',
  PHONE_BOOK_SET_APPLICATION_MODE = '[Application] Set application mode',
  PHONE_BOOK_SELECT_COMPANY = '[Application] Select company',
  PHONE_BOOK_SHOW_SIDEBAR_TOGGLE_BUTTON = '[UI] Show side bar toggle button',
  PHONE_BOOK_HIDE_SIDEBAR_TOGGLE_BUTTON = '[UI] Hide sidebar toggle button'
}

/**
 * Загрузка данных с сервера для инициализации приложения
 */
export class PhoneBookLoadInitialData implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_LOAD_INITIAL_DATA;
}

/**
 * Загрузка данных с сервера для инициализации приложения выполнена успешно
 */
export class PhoneBookLoadInitialDataSuccess implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_LOAD_INITIAL_DATA_SUCCESS;
  constructor(public payload: IServerResponse<IInitialData>) {}
}

/**
 * Установка режима отображения приложения
 */
export class PhoneBookSetViewMode implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_SET_VIEW_MODE;
  constructor(public payload: EViewMode) {}
}

/**
 * Установка текущего режима приложения
 */
export class PhoneBookSetApplicationMode implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_SET_APPLICATION_MODE;
  constructor(public payload: EApplicationMode) {}
}

/**
 * Выбор текущей организации
 */
export class PhoneBookSelectCompany implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_SELECT_COMPANY;
  constructor(public payload: number) {}
}

/**
 * Показать кнопку открытия боковой панели
 */
export class PhoneBookShowSidebarToggleButton implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_SHOW_SIDEBAR_TOGGLE_BUTTON;
}

/**
 * Скрыть кнопку откерытия боковой панели
 */
export class PhoneBookHideSidebarToggleButton implements Action {
  readonly type = PhoneBookActionTypes.PHONE_BOOK_HIDE_SIDEBAR_TOGGLE_BUTTON;
}

export type PhoneBookActions =
  PhoneBookLoadInitialData |
  PhoneBookLoadInitialDataSuccess |
  PhoneBookSetViewMode |
  PhoneBookSetApplicationMode |
  PhoneBookSelectCompany |
  PhoneBookShowSidebarToggleButton |
  PhoneBookHideSidebarToggleButton;
