import { AuthenticationInitialState, IAuthenticationState } from '@kolenergo/core';
import { IRequestsState, requestsInitialState } from '../features/requests/ngrx/requests.state';
import { EListMode, EViewMode } from '../enums';
import { Driver, RequestStatus, RoutePoint, Transport } from '../models';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IAppState {
  isInitialized: boolean;         // Приложение инициализировано
  isLoading: boolean;             // Выполняется загрузка
  isSidebarOpened: boolean;       // Состояние боковой панели
  isCompactMode: boolean;       // Компаетный режим
  viewMode: EViewMode;            // Режим отображения заявок
  listMode: EListMode;            // Режим списка заявок
  date: Date;                     // Текущая дата
  selectedDate: Date;             // Выбранная дата
  calendarPeriodStart: number;    // Дата и время начала периода в календаре в формате Unix
  calendarPeriodEnd: number;      // Дата и время окончания периода в календаре в формате Unix
  transport: Transport[];         // Транспорт
  drivers: Driver[];              // Водители
  statuses: RequestStatus[];      // Статусы заявок
  routes: RoutePoint[];           // Элементы маршрута
}

/**
 * Начальное состояние ядра приложения
 */
export const appInitialState: IAppState = {
  isInitialized: false,
  isLoading: true,
  isSidebarOpened: true,
  isCompactMode: false,
  viewMode: EViewMode.VIEW_LIST,
  listMode: EListMode.ALL_REQUESTS,
  date: null,
  selectedDate: null,
  calendarPeriodStart: 0,
  calendarPeriodEnd: 0,
  transport: [],
  drivers: [],
  statuses: [],
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
