import { Action } from '@ngrx/store';

/**
 * Множество типов действий приложения
 */
export enum EApplicationActionTypes {
  APPLICATION_CHANGE_VIEW_MODE = '[Application UI] View mode changed',
  APPLICATION_CLOSE_SIDEBAR = '[Application UI] Close sidebar',
  APPLICATION_OPEN_SIDEBAR = '[Application UI] Open sidebar'
}

/**
 * Изменение режима отображения приложения
 */
export class ApplicationChangeViewMode implements Action {
  readonly type = EApplicationActionTypes.APPLICATION_CHANGE_VIEW_MODE;
  constructor(public payload: EApplicationActionTypes) {}
}

/**
 * Закрытие боковой панели
 */
export class ApplicationCloseSidebar implements Action {
  readonly type = EApplicationActionTypes.APPLICATION_CLOSE_SIDEBAR;
}

/**
 * Открытие боковой панели
 */
export class ApplicationOpenSidebar implements Action {
  readonly type = EApplicationActionTypes.APPLICATION_OPEN_SIDEBAR;
}

/**
 * Действия приложения
 */
export type ApplicationActions =
  ApplicationChangeViewMode |
  ApplicationCloseSidebar |
  ApplicationOpenSidebar;
