import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IApplicationState, IPortalState } from './application.state';

/**
 * Селектор дерева параметров портала
 */
export const selectPortal = createFeatureSelector<IApplicationState, IPortalState>('portal');

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsApplicationInitialized = createSelector(
  selectPortal,
  (state: IPortalState) => state.isApplicationInitialized
);

/**
 * Селектор состояние загрузки данных для инициализации приложения с сервера
 */
export const selectFetchingInProgress = createSelector(
  selectPortal,
  (state: IPortalState) => state.fetchingInProgress
);

/**
 * Селектор количества объявлений на старотовой странице
 */
export const selectAdvertsOnStartPageCount = createSelector(
  selectPortal,
  (state: IPortalState) => state.advertsOnStartPageCount
);

/**
 * Селектор общего количества объявлений
 */
export const selectTotalAdvertsCount = createSelector(
  selectPortal,
  (state: IPortalState) => state.totalAdvertsCount
);

/**
 * Селектор состояние загрузки объявлений с сервера
 */
export const selectAdvertsIsFetching = createSelector(
  selectPortal,
  (state: IPortalState) => state.advertsIsFetching
);

/**
 * Селектор списка объявлений на главной старнице
 */
export const selectAdvertsOnStartPage = createSelector(
  selectPortal,
  (state: IPortalState) => state.advertsOnStartPage
);
