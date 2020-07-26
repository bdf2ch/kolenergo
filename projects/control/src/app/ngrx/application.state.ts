import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { applicationsInitialState, IApplicationsState } from '../features/applications/ngrx';
import { Application } from '../models';

export interface IAppState {
  isLoading: boolean;                     // Выполняется ли загрузка данных с сервера
  isInitialized: boolean;                 // Выполнена ли инициализация приложения
  applications: Application[];           // Список приложений
}

export const appInitialState: IAppState = {
  isLoading: false,
  isInitialized: false,
  applications: []
};

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  // isLoading: boolean;                     // Выполняется ли загрузка данных с сервера
  // isInitialized: boolean;                 // Выполнена ли инициализация приложения
  app: IAppState;
  session: IAuthenticationState;
  applications: IApplicationsState;
}

/**
 * Начальное состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  // isLoading: false,
  // isInitialized: false
  app: appInitialState,
  session: AuthenticationInitialState,
  applications: applicationsInitialState
};
