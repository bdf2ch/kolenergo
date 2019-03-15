import {IAuthenticationState, authenticationInitialState} from './authentication.state';
import * as authentication from './authentication.actions';

export function reducer(
  state = authenticationInitialState,
  action: authentication.AuthenticationActions): IAuthenticationState {
  switch (action.type) {
    case authentication.actionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case authentication.actionTypes.AUTHENTICATION_FAIL:
      return {
        ...state
      };
    default: {
      return authenticationInitialState;
    }
  }
}
