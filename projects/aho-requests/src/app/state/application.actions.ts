import { Action } from '@ngrx/store';

export enum ahoRequestsActionTypes {
  LOAD_REQUESTS = '[AHO Requests] Load requests'
}

export class LoadRequests implements Action {
  readonly type = ahoRequestsActionTypes.LOAD_REQUESTS;

  constructor(public payload: {userId: number}) {}
}

export type AhoRequestsActions = LoadRequests;
