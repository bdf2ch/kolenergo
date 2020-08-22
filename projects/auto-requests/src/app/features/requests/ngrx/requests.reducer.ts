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

    case ApplicationActionTypes.APPLICATION_LOAD_INITIAL_DATA_SUCCESS: {
      return {
        ...state,
        requests: action.payload.data.requests.map((item: IRequest) => new Request(item))
      };
    }

    case RequestsActionTypes.REQUESTS_LOAD_REQUESTS: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}
