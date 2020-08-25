import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { IRequestsState, requestsInitialState } from '../features/requests/ngrx';
import { EListMode, EViewMode } from '../enums';
import { RoutePoint } from '../models';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IAppState {
  isInitialized: boolean;     // Приложение инициализировано
  isLoading: boolean;         // Выполняется загрузка
  viewMode: EViewMode;        // Режим отображения заявок
  listMode: EListMode;        // Режим списка заявок
  date: Date;                 // Текущая дата
  selectedDate: Date;         // Выбранная дата
  routes: RoutePoint[];       // Элементы маршрута
}

/**
 * Начальное состояние ядра приложения
 */
export const appInitialState: IAppState = {
  isInitialized: false,
  isLoading: true,
  viewMode: EViewMode.VIEW_LIST,
  listMode: EListMode.ALL_REQUESTS,
  date: null,
  selectedDate: null,
  routes: []
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
