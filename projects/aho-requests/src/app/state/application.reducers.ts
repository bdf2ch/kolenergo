import { ApplicationModes, IApplicationState, initialState } from './application.state';
import * as actions from './application.actions';
import { AhoRequest, AhoRequestRejectReason, AhoRequestStatus, AhoRequestType, FilterManager } from '../aho-requests/models';
import {IAhoRequest, IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType} from '../aho-requests/interfaces';
import {User} from '../../../../kolenergo-core/src/lib/models';

export function reducer(
  state: IApplicationState = initialState,
  action: actions.AhoRequestsActions
): IApplicationState {
  switch (action.type) {
    case actions.AhoRequestsActionTypes.LOAD_ALL_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.ALL_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_ALL_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_OWN_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.OWN_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_OWN_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.EMPLOYEE_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: state.currentPage > 0
          ? [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))]
          : [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.round(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS: {
      return {
        ...state,
        mode: ApplicationModes.EXPIRED_REQUESTS_MODE,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: [...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        totalPages: Math.floor(action.payload.data.totalRequests / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.payload
      };
    }
    case actions.AhoRequestsActionTypes.SELECT_REQUESTS_MODE: {
      return {
        ...state,
        mode: action.payload
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state,
        fetchingDataInProgress: true
      };
    }
    case actions.AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS: {
      console.log(action);
      return {
        ...state,
        requestTypes: action.payload.data.types.map((item: IAhoRequestType) => {
          return new AhoRequestType(item);
        }),
        requestStatuses: action.payload.data.statuses.map((item: IAhoRequestStatus) => {
          return new AhoRequestStatus(item);
        }),
        requestRejectReasons: action.payload.data.rejectReasons.map((item: IAhoRequestRejectReason) => {
          return new AhoRequestRejectReason(item);
        }),
        employees: [...action.payload.data.employees.map((item) => new User(item))],
        requests: action.payload.data.requests.map((item: IAhoRequest) => {
          return new AhoRequest(item);
        }),
        employeeRequestsCount: action.payload.data.employeeRequests_.totalRequestsCount,
        employeeUncompletedRequestsCount: action.payload.data.employeeRequests_.uncompletedRequestsCount,
        expiredRequestsCount: action.payload.data.expiredRequests_.totalRequestsCount,
        totalPages: Math.round(action.payload.data.allRequests.totalRequestsCount / state.itemsOnPage),
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_REQUESTS:
      return {
        ...state,
        fetchingDataInProgress: true
      };
    case actions.AhoRequestsActionTypes.LOAD_REQUESTS_SUCCESS: {
      return {
        ...state,
        requests: [...state.requests, ...action.payload.data.requests.map((item: IAhoRequest) => new AhoRequest(item))],
        currentPage: action.payload.data.page,
        fetchingDataInProgress: false
      };
    }
    case actions.AhoRequestsActionTypes.CHANGE_FILTERS: {
      return {
        ...state,
        filters: new FilterManager(action.payload)
      };
    }
    default: {
      return state;
    }
  }
}
