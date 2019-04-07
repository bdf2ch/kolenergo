import { IAuthenticationState } from '../authentication/state/authentication.state';

export interface IApplicationState {
  session: IAuthenticationState;
}
