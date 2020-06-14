import { Action } from '@ngrx/store';

import { EViewMode } from '../../../enums/view-mode.enum';

/**
 * Множество типов действий приложения
 */
export enum EPortalActionTypes {
  PORTAL_CHANGE_VIEW_MODE = '[UI] View mode changed',
  PORTAL_CLOSE_SIDEBAR = '[UI] Close sidebar',
  PORTAL_OPEN_SIDEBAR = '[UI] Open sidebar',
  PORTAL_TOGGLE_SIDEBAR = '[UI] Toggle sidebar'
}

/**
 * Изменение режима отображения приложения
 */
export class PortalChangeViewMode implements Action {
  readonly type = EPortalActionTypes.PORTAL_CHANGE_VIEW_MODE;
  constructor(public payload: EViewMode) {}
}

/**
 * Закрытие боковой панели
 */
export class PortalCloseSidebar implements Action {
  readonly type = EPortalActionTypes.PORTAL_CLOSE_SIDEBAR;
}

/**
 * Открытие боковой панели
 */
export class PortalOpenSidebar implements Action {
  readonly type = EPortalActionTypes.PORTAL_OPEN_SIDEBAR;
}

/**
 * Открытие / закрытие боковой панели
 */
export class PortalToggleSidebar implements Action {
  readonly type = EPortalActionTypes.PORTAL_TOGGLE_SIDEBAR;
}

/**
 * Действия приложения
 */
export type PortalActions =
  PortalChangeViewMode |
  PortalCloseSidebar |
  PortalOpenSidebar |
  PortalToggleSidebar;
