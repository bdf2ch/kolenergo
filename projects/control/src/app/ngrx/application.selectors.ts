import { createFeatureSelector, createSelector } from '@ngrx/store';

import {IApplicationState, IAppState} from './application.state';

/**
 * Селектор состояния ядра приложения
 */
export const selectApp = createFeatureSelector<IAppState>('app');

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectLoading = createSelector(
  selectApp,
  (app: IAppState) => app.isLoading
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectInitialized = createSelector(
  selectApp,
  (app: IAppState) => app.isInitialized
);

/**
 * Селектор списка приложений
 */
export const selectApplications = createSelector(
  selectApp,
  (app: IAppState) => app.applications
);

