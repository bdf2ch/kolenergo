import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { EViewMode } from '../enums/view-mode.enum';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  session: IAuthenticationState;
  isSidebarOpened: boolean;
  viewMode: EViewMode;
}

/**
 * Начальное состояние приложения
 */
export const IApplicationInitialState: IApplicationState = {
  session: AuthenticationInitialState,
  isSidebarOpened: true,
  viewMode: EViewMode.DESKTOP_VIEW
};
