import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from './authentication.state';
import { IApplicationState } from '../../interfaces';


export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

/**
 * Селектор сосотяния аутентификации
 */
export const selectAuthenticationInProgress = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.isAuthenticationInProgress
);
