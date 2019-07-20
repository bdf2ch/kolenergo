import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from '@kolenergo/core';
import { IApplicationState} from '../app.state';

/**
 * Селектор текущей сессии пользователя
 */
export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

/**
 * Селектор текущего пользователя
 */
export const selectCurrentUser = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.user
);

/**
 * Селектор состояния авторизации
 */
export const selectIsAuthenticationInProgress = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.isAuthenticationInProgress
);
