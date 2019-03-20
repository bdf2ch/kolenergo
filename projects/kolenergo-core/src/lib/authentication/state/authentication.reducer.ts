import { IAuthenticationState, authenticationInitialState } from './authentication.state';
import * as authentication from './authentication.actions';

export function reducer(
  state = authenticationInitialState,
  action: authentication.AuthenticationActions): IAuthenticationState {
  switch (action.type) {
    case authentication.actionTypes.AUTHENTICATION_CHECK:
      return {
        ...state,
        isFetchingData: true
      };
    case authentication.actionTypes.AUTHENTICATION_SIGN_IN:
      return {
        ...state,
        isFetchingData: true
      };
    case authentication.actionTypes.AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isFetchingData: false
      };
    case authentication.actionTypes.AUTHENTICATION_FAIL:
      return {
        ...state,
        user: null,
        isFetchingData: false
      };
    default: {
      return authenticationInitialState;
    }
  }
}
