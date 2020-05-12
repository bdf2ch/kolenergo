import { IMessengerState } from '../features/messenger/ngrx';
import { IAuthenticationState } from '@kolenergo/core';

/**
 * Интерфейс, описывающий состояние приложения
 */
export interface IApplicationState {
  messenger: IMessengerState;
  session: IAuthenticationState;
}
