import {appInitialState, IAppState} from './application.state';
import {ApplicationActions, ApplicationActionTypes} from './application.actions';
import {RequestsActions, RequestsActionTypes} from '../features/requests/ngrx/requests.actions';
import {IDriver, IRequestStatus, IRoutePoint, ITransport} from '../interfaces';
import {Driver, RequestStatus, RoutePoint, Transport} from '../models';
import {EListMode} from '../enums';

/**
 * Редуктор состояния приложения
 * @param state - Состояние
 * @param action - Действие
 */
export function applicationReducer(
  state: IAppState = appInitialState,
  action: ApplicationActions | RequestsActions
): IAppState {
  switch (action.type) {

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
        routes: action.payload.data.routes.map((item: IRoutePoint) => new RoutePoint(item))
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

    default: {
      return state;
    }
  }
}
