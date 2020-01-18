import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from '@kolenergo/core';
import { IApplicationState, IBasicApplicationState } from './application.state';


/**
 * Селектор дерева параметров текущей сессии
 */
export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

/**
 * Селектор дерева параметров ядра приложения
 */
export const selectApplication = createFeatureSelector<IApplicationState, IBasicApplicationState>('application');

/**
 * Селектор текущего пользователя приложения
 */
export const selectUser = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.user
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsApplicationInitialized = createSelector(
  selectApplication,
  (state: IBasicApplicationState) => state.isInitialized
);

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectIsFetchingInProgress = createSelector(
  selectApplication,
  (state: IBasicApplicationState) => state.isFetchingInProgress
);
