import * as moment from 'moment';

import {actionTypes, authenticationActionTypes, FilterManager, SearchFilter} from '@kolenergo/core';
import {IDriver, IRejectReason, IRequestStatus, IRoutePoint, ITransport} from '../interfaces';
import {Driver, RejectReason, RequestStatus, RoutePoint, Transport} from '../models';
import {EListMode} from '../enums';
import {appInitialState, IAppState} from './application.state';
import {ApplicationActions, ApplicationActionTypes} from './application.actions';
import {RequestsActions, RequestsActionTypes} from '../features/requests/ngrx/requests.actions';

/**
 * Редуктор состояния приложения
 * @param state - Состояние
 * @param action - Действие
 */
export function applicationReducer(
  state: IAppState = appInitialState,
  action: ApplicationActions | RequestsActions | authenticationActionTypes
): IAppState {
  switch (action.type) {

    /**
     * Завершение сессии пользователя
     */
    case actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS : {
      return {
        ...state,
        listMode: EListMode.ALL_REQUESTS
      };
    }

    /**
     * Установка режима компактного отображения
     */
    case ApplicationActionTypes.APPLICATION_SET_COMPACT_MODE: {
      return {
        ...state,
        isCompactMode: action.payload
      };
    }

    /**
     * Открытие боковой панели
     */
    case ApplicationActionTypes.APPLICATION_OPEN_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: true
      };
    }

    /**
     * Закрытие боковой панели
     */
    case ApplicationActionTypes.APPLICATION_CLOSE_SIDEBAR: {
      return {
        ...state,
        isSidebarOpened: false
      };
    }

    /**
     * Загрузка данных для инициализации приложения
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка данных для инициализации приложения выполнена успешно
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        date: new Date(action.payload.data.date),
        selectedDate: new Date(action.payload.data.date),
        transport: action.payload.data.transport.map((item: ITransport) => new Transport(item)),
        drivers: action.payload.data.drivers.map((item: IDriver) => new Driver(item)),
        statuses: action.payload.data.statuses.map((item: IRequestStatus) => new RequestStatus(item)),
        rejectReasons: action.payload.data.rejectReasons.map((item: IRejectReason) => new RejectReason(item)),
        routes: action.payload.data.routes.map((item: IRoutePoint) => new RoutePoint(item)),
        availableTransport: action.payload.data.transport.map((item: ITransport) => new Transport(item))
      };
    }

    /**
     * Не удалось выполнитть загрузку данных для инициализации приложения
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Изменение периода календаря
     */
    case ApplicationActionTypes.APPLICATION_CALENDAR_PERIOD_CHANGE: {
      return {
        ...state,
        calendarPeriodStart: action.payload.start,
        calendarPeriodEnd: action.payload.end
      };
    }

    /**
     * Выбор режима отображения заявок
     */
    case ApplicationActionTypes.APPLICATION_SELECT_VIEW_MODE: {
      return {
        ...state,
        viewMode: action.payload
      };
    }

    /**
     * Выбор режима отображения списка заявок
     */
    case ApplicationActionTypes.APPLICATION_SELECT_LIST_MODE: {
      return {
        ...state,
        listMode: action.payload
      };
    }

    /**
     * Выбор текущей даты
     */
    case ApplicationActionTypes.APPLICATION_SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      };
    }

    /**
     * Установка фильтров заявок
     */
    case ApplicationActionTypes.APPLICATION_SET_FILTERS: {
      return {
        ...state,
        filters: new FilterManager(action.payload)
      };
    }

    /**
     * Сборс фильтров заявок
     */
    case ApplicationActionTypes.APPLICATION_CLEAR_FILTERS: {
      return {
        ...state,
        listMode: state.search ? EListMode.FILTERED_REQUESTS : EListMode.ALL_REQUESTS,
        filters: new FilterManager([
          new SearchFilter<Date>(
            'startDate',
            'Начало периода',
            null,
            (val: Date) => `с ${val ? moment(val).format('DD.MM.YYYY') : null}`
          ),
          new SearchFilter<Date>(
            'endDate',
            'Окончание периода',
            null,
            (val: Date) => `по ${val ? moment(val).format('DD.MM.YYYY') : null}`
          ),
          new SearchFilter<RequestStatus>(
            'status',
            'Статус заявки',
            null,
            (val: RequestStatus) => val ? val.title : ''
          ),
          new SearchFilter<Transport>(
            'transport',
            'Транспорт',
            null,
            (val: Transport) => val ?  val.model : ''
          ),
          new SearchFilter<Driver>(
            'driver',
            'Водитель',
            null,
            (val: Driver) => val ? `${val.firstName} ${val.lastName}` : ''
          ),
          new SearchFilter<Driver>(
            'user',
            'Заказчик',
            null,
            (val: Driver) => val ? `${val.firstName} ${val.lastName}` : ''
          ),
        ])
      };
    }

    /**
     * Сброс фильтра заявок
     */
    case ApplicationActionTypes.APPLICATION_CLEAR_FILTER: {
      return {
        ...state,
        filters: new FilterManager(action.payload),
        listMode: state.filters.isFiltersApplied() || state.search.length > 0
          ? EListMode.FILTERED_REQUESTS
          : EListMode.ALL_REQUESTS
      };
    }

    /**
     * Изменение строки поиска заявок
     */
    case ApplicationActionTypes.APPLICATION_SEARCH_CHANGED: {
      return {
        ...state,
        search: action.payload
      };
    }

    /**
     * Очистка строки поиска заявок
     */
    case ApplicationActionTypes.APPLICATION_CLEAR_SEARCH: {
      return {
        ...state,
        search: '',
        listMode: state.filters.isFiltersApplied()
          ? EListMode.FILTERED_REQUESTS
          : EListMode.ALL_REQUESTS
      };
    }

    /**
     * Загрузка заявок
     */
    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка заявок выполнена успешно
     */
    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listMode: EListMode.ALL_REQUESTS
      };
    }

    /**
     * Не удалось загрузить заявки
     */
    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Загрузка заявок текущего пользователя
     */
    case RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка заявок текущего пользователя выполнена успешно
     */
    case RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Не удалось загрузить заявки текущего пользователя
     */
    case RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_FAIL : {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Загрузка отфильтрованных заявок
     */
    case RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка отфильтрованных заявок успешно завершена
     */
    case RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listMode: state.filters.isFiltersApplied() || state.search.length > 0
          ? EListMode.FILTERED_REQUESTS
          : EListMode.ALL_REQUESTS
      };
    }

    /**
     * Не удалось загрузить отфильтрованные заявки
     */
    case RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Загрузка заявок по транспорту и времени поездки выполнена успешно
     */
    case RequestsActionTypes.LOAD_BUSY_SUCCESS: {
      return {
        ...state,
        availableTransport:
          action.payload.data.transport.length > 0
            ? state.transport.filter(
                (transport: Transport) => action.payload.data.transport.find(
              (transportId: number) => transportId === transport.id
                ) ? false : true
              )
            : state.transport,
        availableDrivers:
          action.payload.data.drivers.length > 0
            ? state.drivers.filter(
            (driver: Driver) => action.payload.data.drivers.find(
              (driverId: number) => driverId === driver.id
            ) ? false : true
            )
            : state.drivers
      };
    }

    /**
     * Добавление новой заявки
     */
    case RequestsActionTypes.REQUESTS_ADD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Новая заявка добавлена успешно
     */
    case RequestsActionTypes.REQUESTS_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listMode: EListMode.ALL_REQUESTS,
        routes: action.payload.data.routes.length > 0
          ? [
            ...state.routes,
            ...action.payload.data.routes
              .map((route) => new RoutePoint(route))]
              .sort((a, b) => a.title < b.title ? -1 : 1)
          : state.routes
      };
    }

    /**
     * Сохранение изменений в заявке
     */
    case RequestsActionTypes.REQUESTS_EDIT_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Сохранение изменений в заявке выполнено успешно
     */
    case RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        routes: action.payload.data.routes.length > 0
          ? [
            ...state.routes,
            ...action.payload.data.routes
              .map((route) => new RoutePoint(route))]
            .sort((a, b) => a.title < b.title ? -1 : 1)
          : state.routes
      };
    }

    /**
     * Не удалось сохранить изменения в заявке
     */
    case RequestsActionTypes.REQUESTS_EDIT_REQUEST_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Экспорт заявок
     */
    case RequestsActionTypes.REQUESTS_EXPORT_REQUESTS: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Экспорт заявок выполнен успешно
     */
    case RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Не удалось выполнить экспорт заявок
     */
    case RequestsActionTypes.REQUESTS_EXPORT_REQUESTS_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Отмена заявки
     */
    case RequestsActionTypes.REQUESTS_CANCEL_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    /**
     * Заявка успешно отменена
     */
    case RequestsActionTypes.REQUESTS_CANCEL_REQUEST_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Не удалось отменить заявку
     */
    case RequestsActionTypes.REQUESTS_CANCEL_REQUEST_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Загрузка отчета об использовании транспорта
     */
    case RequestsActionTypes.LOAD_TRANSPORT_REPORT: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка отчета об использовании транспорта выполнена успешно
     */
    case RequestsActionTypes.LOAD_TRANSPORT_REPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Не удалось загрузить отчет об использовании транспорта
     */
    case RequestsActionTypes.LOAD_TRANSPORT_REPORT_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Загрузка отчета о занятости водителя
     */
    case RequestsActionTypes.LOAD_DRIVER_REPORT: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Загрузка отчета о занятости водителя выполнена успешно
     */
    case RequestsActionTypes.LOAD_DRIVER_REPORT_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }

    /**
     * Не удалось загрузить отчет о занятости водителя
     */
    case RequestsActionTypes.LOAD_DRIVER_REPORT_FAIL: {
      return {
        ...state,
        isLoading: false
      };
    }

    default: {
      return state;
    }
  }
}
