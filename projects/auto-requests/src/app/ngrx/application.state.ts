import { IAuthenticationState, AuthenticationInitialState } from '@kolenergo/core';
import { requestsInitialState, IRequestsState } from '../features/requests/ngrx';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IAppState {
  isInitialized: boolean;
  isLoading: boolean;
}

/**
 * Начальное состояние ядра приложения
 */
export const appInitialState: IAppState = {
  isInitialized: false,
  isLoading: false
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
