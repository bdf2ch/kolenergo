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
 * Селектор меню
 */
export const selectMenu = createSelector(
  selectApp,
  (app: IAppState) => app.menu
);

/**
 * Селектор пути к текущему разделу приложения
 */
export const selectBreadcrumb = createSelector(
  selectApp,
  (app: IAppState) => app.breadcrumb
);

/**
 * Селектор списка приложений
 */
export const selectApplications = createSelector(
  selectApp,
  (app: IAppState) => app.applications
);

