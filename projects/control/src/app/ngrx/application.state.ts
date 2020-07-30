import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { applicationsInitialState, IApplicationsState } from '../features/applications/ngrx';
import { Application, Menu, MenuItem } from '../models';

export interface IAppState {
  isLoading: boolean;                     // Выполняется ли загрузка данных с сервера
  isInitialized: boolean;                 // Выполнена ли инициализация приложения
  applications: Application[];            // Список приложений
  menu: Menu;                             // Меню приложению
  breadcrumb: MenuItem[];                 // Путь к текущему разделу приложения
}

export const appInitialState: IAppState = {
  isLoading: false,
  isInitialized: false,
  applications: [],
  menu: null,
  breadcrumb: []
};

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  app: IAppState;
  session: IAuthenticationState;
  applications: IApplicationsState;
}

/**
 * Начальное состояние приложения
 */
export const applicationInitialState: IApplicationState = {
  app: appInitialState,
  session: AuthenticationInitialState,
  applications: applicationsInitialState
};
