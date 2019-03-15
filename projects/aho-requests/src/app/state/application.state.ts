import { IAuthenticationState, authenticationInitialState } from 'kolenergo-core';

export interface IApplicationState {
  session: IAuthenticationState;
}

export const ahoRequestsInitialState: IApplicationState = {
  session: authenticationInitialState
};
