import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { EViewMode } from '../enums/view-mode.enum';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  session: IAuthenticationState;
  portal: IPortalState;
}

/**
 * Интерфейс, описывающий сосотояние базового приложения портала
 */
export interface IPortalState {
  isLoading: boolean;
  isInitialised: boolean;
  isSidebarOpened: boolean;
  viewMode: EViewMode;
}

/**
 * Начальное состояние базового приложения портала
 */
export const portalInitialState: IPortalState = {
  isLoading: false,
  isInitialised: false,
  isSidebarOpened: true,
  viewMode: EViewMode.LARGE
};

/**
 * Начальное состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  session: AuthenticationInitialState,
  portal: portalInitialState
};
