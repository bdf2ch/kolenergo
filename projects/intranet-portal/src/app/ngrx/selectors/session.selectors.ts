import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from '@kolenergo/core';
import { IApplicationState } from '../';

/**
 * Селектор раздела с отчетами по оперативной обстановке
 */
export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

/**
 * Селектор текущего пользователя
 */
export const selectUser = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.user
);

