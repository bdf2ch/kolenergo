import {appInitialState, IAppState} from './application.state';
import {ApplicationActions, ApplicationActionTypes} from './application.actions';
import {IRoutePoint} from '../interfaces';
import {RoutePoint} from '../models';
import {RequestsActions, RequestsActionTypes} from '../features/requests/ngrx';
import {EListMode} from "../enums";

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
    case RequestsActionTypes.ADD_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    /**
     * Новая заявка добавлена успешно
     */
    case RequestsActionTypes.ADD_REQUEST_SUCCESS: {
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

    default: {
      return state;
    }
  }
}
