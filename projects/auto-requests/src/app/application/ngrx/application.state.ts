import { IAuthenticationState, AuthenticationInitialState } from '@kolenergo/core';
import { requestsInitialState, IRequestsState } from '../features/requests/ngrx';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IBasicApplicationState {
  isInitialized: boolean;
  isFetchingInProgress: boolean;
}

/**
 * Начальное состояние ядра приложения
 */
export const basicApplicationInitialState: IBasicApplicationState = {
  isInitialized: false,
  isFetchingInProgress: false
};

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  application: IBasicApplicationState;
  requests: IRequestsState;
  session: IAuthenticationState;
}

/**
 * Начальноке состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  application: basicApplicationInitialState,
  requests: requestsInitialState,
  session: AuthenticationInitialState
};
