import { Action } from '@ngrx/store';

import { IServerResponse, SearchFilter } from '@kolenergo/core';
import { IInitialData } from '../interfaces';
import { EListMode, EViewMode } from '../enums';

/**
 * Типы действий приложения
 */
export const enum ApplicationActionTypes {
  APPLICATION_SET_COMPACT_MODE = '[Application UI] Set compact mode',
  APPLICATION_OPEN_SIDEBAR = '[Application UI] Open sidebar',
  APPLICATION_CLOSE_SIDEBAR = '[Application UI] Close sidebar',
  APPLICATION_LOAD_INITIAL_DATA = '[Auto API] Load application initial data',
  APPLICATION_LOAD_INITIAL_DATA_SUCCESS = '[Auto API] Application initial data loaded successfully',
  APPLICATION_LOAD_INITIAL_DATA_FAIL = '[Auto API] Failed to load application initial data',
  APPLICATION_LOAD_CALENDAR_REQUESTS = '[Auto API] Load calendar requests',
  APPLICATION_LOAD_CALENDAR_REQUESTS_SUCCESS = '[Auto API] Calendar requests loaded successfully',
  APPLICATION_LOAD_CALENDAR_REQUESTS_FAIL = '[Auto API] Failed to load calendar requests',
  APPLICATION_CALENDAR_PERIOD_CHANGE = '[Application UI] Calendar period changed',
  APPLICATION_SELECT_VIEW_MODE = '[Application UI] Select requests view mode',
  APPLICATION_SELECT_LIST_MODE = '[Application UI] Select requests list mode',
  APPLICATION_SELECT_DATE = '[Application UI] Select date',
  APPLICATION_SET_FILTERS = '[Application UI] Set filter value',
  APPLICATION_CLEAR_FILTERS = '[Application UI] Clear filters',
  APPLICATION_CLEAR_FILTER = '[Application UI] Clear filter',
  APPLICATION_SEARCH_CHANGED = '[Application UI] Search query changed',
  APPLICATION_OPEN_SIGN_IN_DIALOG = '[Application UI] Open sign in dialog',
  APPLICATION_OPEN_ADD_REQUEST_DIALOG = '[Application UI] Open add request dialog',
  APPLICATION_OPEN_FILTERS_DIALOG = '[Application UI] Open  filters dialog'
}

/**
 * Установка режима компактного отображения
 */
export class ApplicationSetCompactMode implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SET_COMPACT_MODE;
  constructor(public payload: boolean) {}
}

/**
 * Открытие боковой панели
 */
export class ApplicationOpenSidebar implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_OPEN_SIDEBAR;
}

/**
 * Закрытие боковой панели
 */
export class ApplicationCloseSidebar implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_CLOSE_SIDEBAR;
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
 * Загрузка оповещений о завках дяля календаря
 */
export class ApplicationLoadCalendarRequests implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS;
  constructor(public payload: {start: number, end: number}) {}
}

/**
 * Загрузка оповещений о завках для календаря выполнена успешно
 */
export class ApplicationLoadCalendarRequestsSuccess implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS_SUCCESS;
  constructor(public payload: IServerResponse<{date: string, count: number}[]>) {}
}

/**
 * Не удалось выполнить загрузку оповещений о завках для календаря
 */
export class ApplicationLoadCalendarRequestsFail implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS_FAIL;
}

/**
 * Изменение периода календаря
 */
export class ApplicationCalendarPeriodChange implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_CALENDAR_PERIOD_CHANGE;
  constructor(public payload: {start: number, end: number}) {}
}

/**
 * Выбор режима отображения заявок
 */
export class ApplicationSelectViewMode implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SELECT_VIEW_MODE;
  constructor(public payload: EViewMode) {}
}

/**
 * Выбор режима отображения списка заявок
 */
export class ApplicationSelectListMode implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SELECT_LIST_MODE;
  constructor(public payload: EListMode) {}
}

/**
 * Выбор текущей даты
 */
export class ApplicationSelectDate implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SELECT_DATE;
  constructor(public payload: Date) {}
}

/**
 * Установка значения фильтра
 */
export class ApplicationSetFilters implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SET_FILTERS;
  constructor(public payload: SearchFilter<any>[]) {}
}

/**
 * Сброс фильтров заявок
 */
export class ApplicationClearFilters implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_CLEAR_FILTERS;
}

/**
 * Сборс фильтра заявок
 */
export class ApplicationClearFilter implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_CLEAR_FILTER;
  constructor(public payload: SearchFilter<any>[]) {}
}

/**
 * Изменение строки поиска заявок
 */
export class ApplicationSearchChanged implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_SEARCH_CHANGED;
  constructor(public payload: string) {}
}

/**
 * Открытие диалогового окна авторизации пользователя
 */
export class ApplicationOpenSignInDialog implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_OPEN_SIGN_IN_DIALOG;
  constructor(public payload: boolean) {}
}

/**
 * Открытие диалогового окна добавления новой заявки
 */
export class ApplicationOpenAddRequestDialog implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_OPEN_ADD_REQUEST_DIALOG;
}

/**
 * Открытие диалогового кона с фильрами заявок
 */
export class ApplicationOpenFiltersDialog implements Action {
  readonly type = ApplicationActionTypes.APPLICATION_OPEN_FILTERS_DIALOG;
}

/**
 * Составной тип всех действий в приложении
 */
export type ApplicationActions =
  ApplicationSetCompactMode |
  ApplicationOpenSidebar |
  ApplicationCloseSidebar |
  ApplicationLoadInitialData |
  ApplicationLoadInitialDataSuccess |
  ApplicationLoadInitialDataFail |
  ApplicationLoadCalendarRequests |
  ApplicationLoadCalendarRequestsSuccess |
  ApplicationLoadCalendarRequestsFail |
  ApplicationCalendarPeriodChange |
  ApplicationSelectViewMode |
  ApplicationSelectListMode |
  ApplicationSelectDate |
  ApplicationSetFilters |
  ApplicationClearFilter |
  ApplicationClearFilters |
  ApplicationSearchChanged |
  ApplicationOpenSignInDialog |
  ApplicationOpenAddRequestDialog |
  ApplicationOpenFiltersDialog;
