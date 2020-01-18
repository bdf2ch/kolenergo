import { createSelector } from '@ngrx/store';

import { IAuthenticationState } from '@kolenergo/core';
import { IApplicationState } from './application.state';


/**
 * Селектор дерева параметров сессии
 * @param state - Состояние приложения
 */
export const selectSession = (state: IApplicationState) => state.session;

/**
 * Селектор текущего пользователя приложения
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
