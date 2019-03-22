import { IApplicationState, initialState } from './application.state';
import * as actions from './application.actions';
import {AhoRequestRejectReason, AhoRequestStatus, AhoRequestType} from '../aho-requests/models';
import {IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType} from '../aho-requests/interfaces';

export function reducer(
  state: IApplicationState = initialState,
  action: actions.AhoRequestsActions
): IApplicationState {
  switch (action.type) {
    case actions.AhoRequestsActionTypes.LOAD_INITIAL_DATA: {
      return {
        ...state
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
        })
      };
    }
    case actions.AhoRequestsActionTypes.LOAD_REQUESTS:
      return {
        ...state
      };
    default: {
      return state;
    }
  }
}
