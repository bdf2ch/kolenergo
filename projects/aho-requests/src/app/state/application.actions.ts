import { Action } from '@ngrx/store';
import {IAhoRequestsInitialData} from '../aho-requests/interfaces';
import {IServerResponse} from '../../../../kolenergo-core/src/lib/interfaces';

export enum AhoRequestsActionTypes {
  LOAD_INITIAL_DATA = '[AHO Requests] Load initial data',
  INITIAL_DATA_LOAD_SUCCESS = '[AHO Requests] initial data loaded successfully',
  LOAD_REQUESTS = '[AHO Requests] Load requests'
}

export class LoadInitialData implements Action {
  readonly  type = AhoRequestsActionTypes.LOAD_INITIAL_DATA;
}

export class InitialDataLoadSuccess implements Action {
  readonly  type = AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS;

  constructor(public payload: IServerResponse<IAhoRequestsInitialData>) {}
}

export class LoadRequests implements Action {
  readonly type = AhoRequestsActionTypes.LOAD_REQUESTS;

  constructor(public payload: {userId: number}) {}
}

export type AhoRequestsActions = LoadInitialData | InitialDataLoadSuccess | LoadRequests;
