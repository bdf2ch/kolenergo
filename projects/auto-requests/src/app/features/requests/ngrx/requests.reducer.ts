import { requestsInitialState, IRequestsState } from './requests.state';
import { RequestsActionTypes } from './requests.actions';

export function reducer(
  state: IRequestsState = requestsInitialState,
  action: RequestsActionTypes
): IRequestsState {
  switch (action) {
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
