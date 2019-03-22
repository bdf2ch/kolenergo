import { IAuthenticationState, authenticationInitialState } from 'kolenergo-core';
import { AhoRequestType } from '../aho-requests/models';
import {IAhoRequestRejectReason, IAhoRequestStatus, IAhoRequestType} from '../aho-requests/interfaces';

export interface IApplicationState {
  // session: IAuthenticationState;
  requestTypes: IAhoRequestType[];
  requestStatuses: IAhoRequestStatus[];
  requestRejectReasons: IAhoRequestRejectReason[];
}

export const initialState: IApplicationState = {
  // session: authenticationInitialState
  requestTypes: [],
  requestStatuses: [],
  requestRejectReasons: []
};
