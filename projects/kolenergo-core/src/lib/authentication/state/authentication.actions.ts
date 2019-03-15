import {Action} from '@ngrx/store';
import {IUser} from '../../interfaces';

export enum actionTypes {
  AUTHENTICATION_SUCCESS = '[Auth API] Authentication succeed',
  AUTHENTICATION_FAIL = '[Auth API] Authentication failed'
}

export class AuthenticationSuccess implements Action {
  readonly type = actionTypes.AUTHENTICATION_SUCCESS;

  constructor(public payload: IUser) {}
}

export class AuthenticationFail implements Action {
  readonly type = actionTypes.AUTHENTICATION_FAIL;

  constructor(public payload: string) {}
}

export type AuthenticationActions = AuthenticationSuccess | AuthenticationFail;
