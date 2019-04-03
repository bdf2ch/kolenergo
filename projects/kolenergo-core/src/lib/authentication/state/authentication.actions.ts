import { Action } from '@ngrx/store';

import { User } from '../../models';
import { IUser } from '../../interfaces';

export enum actionTypes {
  AUTHENTICATION_CHECK = '[Auth API] Check session',
  AUTHENTICATION_CHECK_SUCCESS = '[Auth API] Session determined successfully',
  AUTHENTICATION_CHECK_FAIL = '[Auth API] Session not found',
  AUTHENTICATION_SIGN_IN = '[Auth API] Sign in',
  AUTHENTICATION_SIGN_IN_SUCCESS = '[Auth API] Sign in completed successfully',
  AUTHENTICATION_SIGN_IN_FAIL = '[Auth API] Sign in failed',
  AUTHENTICATION_SIGN_OUT = '[Auth API] Sign out',
  AUTHENTICATION_SIGN_OUT_SUCCESS = '[Auth API] Signed out successfully',
  AUTHENTICATION_SIGN_OUT_FAIL = '[Auth API] Sign out failed',
  AUTHENTICATION_SIGN_IN_BUTTON_PRESSED = '[Sign in dialog] Sign in button pressed'
}

export class AuthenticationCheck implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK;
}

export class AuthenticationCheckSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK_SUCCESS;

  constructor(public payload: IUser) {}
}

export class AuthenticationCheckFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK_FAIL;
}

export class AuthenticationSignIn implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN;

  constructor(public payload: {account: string, password: string}) {}
}

export class AuthenticationSignInSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS;

  constructor(public payload: IUser) {}
}

export class AuthenticationSignInFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN_FAIL;

  constructor(public payload: string) {}
}

export class AuthenticationSignOut implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT;
}

export class AuthenticationSignOutSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS;
}

export class AuthenticationSignOutFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT_FAIL;
}

export class AuthenticationSignInButtonPressed implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN_BUTTON_PRESSED;
}

export type authenticationActionTypes =
  AuthenticationCheck |
  AuthenticationCheckSuccess |
  AuthenticationCheckFail |
  AuthenticationSignIn |
  AuthenticationSignInSuccess |
  AuthenticationSignInFail |
  AuthenticationSignOut |
  AuthenticationSignOutSuccess |
  AuthenticationSignOutFail |
  AuthenticationSignInButtonPressed;
