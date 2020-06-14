import { IAuthenticationState } from '@kolenergo/core';
import { IPortalState } from '../features/portal/ngrx';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  session: IAuthenticationState;
  portal: IPortalState;
}
