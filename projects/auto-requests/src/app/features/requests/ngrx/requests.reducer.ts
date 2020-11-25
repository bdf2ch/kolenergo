import {actionTypes, authenticationActionTypes} from '@kolenergo/core';
import {IRequestsState, requestsInitialState} from './requests.state';
import {RequestsActions, RequestsActionTypes} from './requests.actions';
import {ApplicationActions, ApplicationActionTypes} from '../../../ngrx';
import {IRequest, ITransport} from '../../../interfaces';
import {Request, Transport} from '../../../models';

export function requestsReducer(
  state: IRequestsState = requestsInitialState,
  action: RequestsActions | ApplicationActions | authenticationActionTypes
): IRequestsState {
  switch (action.type) {

    /**
     * Завершение сессии пользователя
     */
    case actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS: {
      return {
        ...state,
        userRequests: [],
        calendarRequests: []
      };
    }

    /**
     * Загрузка данных для инициализации прилрожения выполнена успешно
     */
    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        requests: action.payload.data.requests.map((item: IRequest) => new Request(item)),
        userRequests: action.payload.data.userRequests.map((item: IRequest) => new Request(item)),
        calendarRequests: action.payload.data.calendarRequests
      };
    }

    /**
     * Выбор текущей заявки
     */
    case RequestsActionTypes.REQUESTS_SELECT_REQUEST: {
      return {
        ...state,
        selectedRequest: action.payload
      };
    }

    /**
     * Выбор транспорта текущей заявки
     */
    case RequestsActionTypes.REQUESTS_SELECT_TRANSPORT: {
      return {
        ...state,
        selectedRequestTransport: action.payload
      };
    }

    /**
     * Сброс фильтров заявок
     */
    case ApplicationActionTypes.APPLICATION_CLEAR_FILTERS: {
      return {
        ...state,
        // filteredRequests: []
      };
    }

    /**
     * Загрузка заявок
     */
    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS: {
      return {
        ...state
      };
    }

    /**
     * Загрузка заявок выполнена успешно
     */
    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: action.payload.data.map((item: IRequest) => new Request(item))
      };
    }

    /**
     * Загрузка заявок текущего пользователя
     */
    case RequestsActionTypes.REQUESTS_LOAD_USER_REQUESTS_SUCCESS: {
      return {
        ...state,
        userRequests: action.payload.data.map((item: IRequest) => new Request(item))
      };
    }

    /**
     * Загрузка отфильтрованных заявок выполнена успешно
     */
    case RequestsActionTypes.REQUESTS_LOAD_FILTERED_REQUESTS_SUCCESS: {
      return {
        ...state,
        filteredRequests: action.payload.data.map((item: IRequest) => new Request(item))
      };
    }

    /**
     * Загрузка оповещений о завках для календаря выполнена успешно
     */
    case ApplicationActionTypes.APPLICATION_LOAD_CALENDAR_REQUESTS_SUCCESS: {
      return {
        ...state,
        calendarRequests: action.payload.data
      };
    }

    /**
     * Новая заявка успешно добавлена
     */
    case RequestsActionTypes.REQUESTS_ADD_REQUEST_SUCCESS: {
      return {
        ...state,
        requests: action.payload.data.requests.map((item: IRequest) => new Request(item)),
        userRequests: action.payload.data.userRequests.map((item: IRequest) => new Request(item)),
        calendarRequests: action.payload.data.calendarRequests
      };
    }

    /**
     * Заявка успешно изменена
     */
    case RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS: {
      return {
        ...state,
        requests: action.payload.data.requests.map((item: IRequest) => new Request(item)),
        calendarRequests: action.payload.data.calendarRequests
      };
    }

    /**
     * Заявка успешно отменена
     */
    case RequestsActionTypes.REQUESTS_CANCEL_REQUEST_SUCCESS: {
      return {
        ...state,
        requests: state.requests.map((request: Request) => request.id === state.selectedRequest.id
          ? new Request(action.payload.data)
          : request
        ),
        userRequests: state.userRequests.map((request: Request) => request.id === state.selectedRequest.id
          ? new Request(action.payload.data)
          : request
        ),
        selectedRequest: new Request(action.payload.data)
      };
    }

    default: {
      return state;
    }
  }
}
