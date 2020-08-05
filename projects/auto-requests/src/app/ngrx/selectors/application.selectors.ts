import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState, IAppState } from '../application.state';

/**
 * Селектор дерева параметров ядра приложения
 */
export const selectApplication = createFeatureSelector<IApplicationState, IAppState>('app');

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsApplicationInitialized = createSelector(
  selectApplication,
  (state: IAppState) => state.isInitialized
);

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectIsFetchingInProgress = createSelector(
  selectApplication,
  (state: IAppState) => state.isLoading
);
