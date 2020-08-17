import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { IRequestsState, requestsInitialState } from '../features/requests/ngrx';
import { EViewMode } from '../enums';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IAppState {
  isInitialized: boolean;
  isLoading: boolean;
  viewMode: EViewMode;
  date: Date;
}

/**
 * Начальное состояние ядра приложения
 */
export const appInitialState: IAppState = {
  isInitialized: false,
  isLoading: true,
  viewMode: EViewMode.VIEW_LIST,
  date: null
};

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  app: IAppState;
  requests: IRequestsState;
  session: IAuthenticationState;
}

/**
 * Начальноке состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  app: appInitialState,
  requests: requestsInitialState,
  session: AuthenticationInitialState
};
