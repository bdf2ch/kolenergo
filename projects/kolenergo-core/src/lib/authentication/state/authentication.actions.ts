import { Action } from '@ngrx/store';

import {IServerResponse, IUser} from '../../interfaces';

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

/**
 * Проверка сессии пользователя
 */
export class AuthenticationCheck implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK;

  constructor(public payload: string) {}
}

/**
 * Успешное окончание проверки сессии пользователя
 */
export class AuthenticationCheckSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK_SUCCESS;

  constructor(public payload: IUser) {}
}

/**
 * Ошибка проверки сессии пользователя
 */
export class AuthenticationCheckFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_CHECK_FAIL;
}

/**
 * Авторизация пользователя
 */
export class AuthenticationSignIn implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN;

  constructor(public payload: {account: string, password: string}) {}
}

/**
 * Успешная авторизация пользователя
 */
export class AuthenticationSignInSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS;

  constructor(public payload: IUser) {}
}

/**
 * Ошибка авторизации пользователя
 */
export class AuthenticationSignInFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_IN_FAIL;

  constructor(public payload: string) {}
}

/**
 * Завершение сессии пользователя
 */
export class AuthenticationSignOut implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT;
}

/**
 * Успешное завершение сессии пользователя
 */
export class AuthenticationSignOutSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS;
}

/**
 * Ошибка завершения сессии пользователя
 */
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
