import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from '@kolenergo/core';
import { IApplicationState } from '../application.state';


/**
 * Селектор дерева параметров текущей сессии
 */
export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

/**
 * Селектор состояния авторизации
 */
export const selectAuthenticationInProgress = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.isAuthenticationInProgress
);


/**
 * Селектор текущего пользователя приложения
 */
export const selectUser = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.user
);
