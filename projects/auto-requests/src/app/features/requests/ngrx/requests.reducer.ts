import { IRequestsState, requestsInitialState } from './requests.state';
import { RequestsActions, RequestsActionTypes } from './requests.actions';
import { ApplicationActions, ApplicationActionTypes } from '../../../ngrx';
import { IRequest } from '../../../interfaces';
import { Request } from '../../../models';

export function requestsReducer(
  state: IRequestsState = requestsInitialState,
  action: RequestsActions | ApplicationActions
): IRequestsState {
  switch (action.type) {

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

    case RequestsActionTypes.REQUESTS_EDIT_REQUEST_SUCCESS: {
      return {
        ...state,
        // requests: [...state.requests.]
      };
    }

    default: {
      return state;
    }
  }
}
