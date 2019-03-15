import { IApplicationState, ahoRequestsInitialState } from './application.state';
import * as actions from './application.actions';

export function reducer(
  state: IApplicationState = ahoRequestsInitialState,
  action: actions.AhoRequestsActions
) {
  switch (action.type) {
    case actions.ahoRequestsActionTypes.LOAD_REQUESTS:
      return {
        ...state
      };
    default:
      return state;
  }
}
