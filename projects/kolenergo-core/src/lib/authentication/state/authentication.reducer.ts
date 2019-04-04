import {authenticationInitialState, IAuthenticationState} from './authentication.state';
import * as authentication from './authentication.actions';
import { User } from '../../models';

export function reducer(
  state = authenticationInitialState,
  action: authentication.authenticationActionTypes): IAuthenticationState {
  switch (action.type) {
    case authentication.actionTypes.AUTHENTICATION_CHECK: {
      return {
        ...state,
        isAuthenticationInProgress: true
      };
    }
    case authentication.actionTypes.AUTHENTICATION_CHECK_SUCCESS: {
      return {
        ...state,
        user: new User(action.payload),
        isAuthenticationInProgress: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_CHECK_FAIL: {
      return  {
        ...state,
        user: null,
        isAuthenticationInProgress: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_IN: {
      return {
        ...state,
        isAuthenticationInProgress: true
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS: {
      return {
        ...state,
        user: new User(action.payload),
        isAuthenticationInProgress: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_IN_FAIL: {
      return {
        ...state,
        user: null,
        isAuthenticationInProgress: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_OUT: {
      return {
        ...state,
        isAuthenticationInProgress: true
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS: {
      return  {
        ...state,
        user: null,
        isAuthenticationInProgress: false
      };
    }
    case authentication.actionTypes.AUTHENTICATION_SIGN_OUT_FAIL: {
      return {
        ...state,
        isAuthenticationInProgress: false
      };
    }
    default: {
      return state;
    }
  }
}
