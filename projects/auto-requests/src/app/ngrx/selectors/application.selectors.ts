import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState, IAppState } from '../application.state';

/**
 * Селектор дерева параметров ядра приложения
 */
export const selectApplication = createFeatureSelector<IApplicationState, IAppState>('app');

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsInitialized = createSelector(
  selectApplication,
  (state: IAppState) => state.isInitialized
);

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectIsLoading = createSelector(
  selectApplication,
  (state: IAppState) => state.isLoading
);

/**
 * Селектор режима отображения заявок
 */
export const selectViewMode = createSelector(
  selectApplication,
  (state: IAppState) => state.viewMode
);

