import { IAuthenticationState } from '@kolenergo/core';
import { IOperativeSituationState } from '../features/operative-situation/ngrx';

/**
 * Состояние приложения
 */
export interface IApplicationState {
  osr: IOperativeSituationState;
  session: IAuthenticationState;
}
