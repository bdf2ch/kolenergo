import {authenticationInitialState, IAuthenticationState} from './authentication.state';
import * as authentication from './authentication.actions';
import { User } from '../../models';

export function reducer(
  state = authenticationInitialState,
  action: authentication.AuthenticationActions): IAuthenticationState {
  switch (action.type) {
    case authentication.actionTypes.AUTHENTICATION_CHECK: {
      return {
        ...state,
        isFetchingData: true
      };
    }
    case authentication.actionTypes.AUTHENTICATION_CHECK_SUCCESS: {
      return {
        ...state,
        user: new User(action.payload)
      };
    }
    case authentication.actionTypes.AUTHENTICATION_CHECK_FAIL: {
      return  {
        ...state,
        user: null
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_IN: {
      console.log('SIGN IN ACTION');
      return {
        ...state,
        isFetchingData: true
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SUCCESS: {
      console.log('SIGN IN SUCCESS ACTION');
      return {
        ...state,
        user: new User(action.payload),
        isFetchingData: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_FAIL: {
      console.log('SIGN IN FAIL ACTION');
      return {
        ...state,
        user: null,
        isFetchingData: false
      };
    }
    default: {
      return authenticationInitialState;
    }
  }
}
