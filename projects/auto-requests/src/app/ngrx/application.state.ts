import * as moment from 'moment';

import {AuthenticationInitialState, FilterManager, IAuthenticationState, SearchFilter, User} from '@kolenergo/core';
import { IRequestsState, requestsInitialState } from '../features/requests/ngrx/requests.state';
import { EListMode, EViewMode } from '../enums';
import {Driver, RejectReason, RequestStatus, RoutePoint, Transport} from '../models';

/**
 * Интерфейс, описывающий состояние ядра приложения
 */
export interface IAppState {
  isInitialized: boolean;           // Приложение инициализировано
  isLoading: boolean;               // Выполняется загрузка
  isSidebarOpened: boolean;         // Состояние боковой панели
  isCompactMode: boolean;           // Компактный режим
  viewMode: EViewMode;              // Режим отображения заявок
  listMode: EListMode;              // Режим списка заявок
  date: Date;                       // Текущая дата
  selectedDate: Date;               // Выбранная дата
  calendarPeriodStart: number;      // Дата и время начала периода в календаре в формате Unix
  calendarPeriodEnd: number;        // Дата и время окончания периода в календаре в формате Unix
  filters: FilterManager;           // Фильтры заявок
  search: string;                   // Строка поиска
  transport: Transport[];           // Транспорт
  drivers: Driver[];                // Водители
  statuses: RequestStatus[];        // Статусы заявок
  rejectReasons: RejectReason[];    // Причины отклонения заявки
  routes: RoutePoint[];             // Элементы маршрута,
  availableTransport: Transport[];  // Транспорт, доступный для выбора
  availableDrivers: Driver[];       // Водители, доступные для выбора
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
  filters: new FilterManager([
    new SearchFilter<Date>('startDate', 'Начало периода', null, (val: Date) => `с ${val ? moment(val).format('DD.MM.YYYY') : null}`),
    new SearchFilter<Date>('endDate', 'Окончание периода', null, (val: Date) => `по ${val ? moment(val).format('DD.MM.YYYY') : null}`),
    new SearchFilter<RequestStatus>('status', 'Статус заявки', null, (val: RequestStatus) => val ? val.title : ''),
    new SearchFilter<Transport>('transport', 'Транспорт', null, (val: Transport) => val ?  val.model : ''),
    new SearchFilter<Driver>('driver', 'Водитель', null, (val: Driver) => val ? `${val.firstName} ${val.lastName}` : ''),
    new SearchFilter<User>('user', 'Заказчик', null, (val: User) => val ? `${val.firstName} ${val.lastName}` : ''),
  ]),
  search: '',
  transport: [],
  drivers: [],
  statuses: [],
  rejectReasons: [],
  routes: [],
  availableTransport: [],
  availableDrivers: []
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
