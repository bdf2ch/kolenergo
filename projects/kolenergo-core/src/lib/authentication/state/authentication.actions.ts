import { Action } from '@ngrx/store';
import { IUser } from '../../interfaces';

export enum actionTypes {
  AUTHENTICATION_CHECK = '[Auth API] Check session',
  AUTHENTICATION_SIGN_IN = '[Auth API] Sign in',
  AUTHENTICATION_SUCCESS = '[Auth API] Authentication succeed',
  AUTHENTICATION_FAIL = '[Auth API] Authentication failed',
  AUTHENTICATION_SIGN_OUT = '[Auth API] Sign out'
}

export class AuthenticationCheck implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK;
}

export class AuthenticationSignIn implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN;

  constructor(public payload: {account: string, password: string}) {}
}

export class AuthenticationSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SUCCESS;

  constructor(public payload: IUser) {}
}

export class AuthenticationFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}

export class AuthenticationSignOut implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT;
}

export type AuthenticationActions =
  AuthenticationCheck |
  AuthenticationSignIn |
  AuthenticationSuccess |
  AuthenticationFail |
  AuthenticationSignOut;
