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

/**
 * Селектор режима отображения списка заявок
 */
export const selectListMode = createSelector(
  selectApplication,
  (state: IAppState) => state.listMode
);

/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  selectApplication,
  (state: IAppState) => state.date
);

/**
 * Селектор выбранной даты
 */
export const selectSelectedDate = createSelector(
  selectApplication,
  (state: IAppState) => state.selectedDate
);

/**
 * Селектор элементов маршрута
 */
export const selectRoutes = createSelector(
  selectApplication,
  (state: IAppState) => state.routes
);


