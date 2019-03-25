import {ApplicationModes, IApplicationState, initialState} from './application.state';
import * as actions from './application.actions';
import {AhoRequest, AhoRequestRejectReason, AhoRequestStatus, AhoRequestType} from '../aho-requests/models';
import {IAhoRequest, IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType} from '../aho-requests/interfaces';

export function reducer(
  state: IApplicationState = initialState,
  action: actions.AhoRequestsActions
): IApplicationState {
  switch (action.type) {
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
        requests: action.payload.data.requests.map((item: IAhoRequest) => {
          return new AhoRequest(item);
        }),
        employeeRequestsCount: action.payload.data.employeeRequests_.totalRequestsCount,
        expiredRequestsCount: action.payload.data.expiredRequests_.totalRequestsCount,
        totalPages: Math.round(action.payload.data.allRequests.totalRequestsCount / 20),
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
        requests: [...state.requests, ...action.payload.data.requests],
        currentPage: action.payload.data.page,
        fetchingDataInProgress: false
      };
    }
    default: {
      return state;
    }
  }
}
