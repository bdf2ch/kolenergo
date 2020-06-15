import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState} from '../../../ngrx/application.state';
import { IPortalState } from './portal.state';

/**
 * Селектор раздела с отчетами по оперативной обстановке
 */
export const selectPortal = createFeatureSelector<IApplicationState, IPortalState>('portal');

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectIsLoading = createSelector(
  selectPortal,
  (state: IPortalState) => state.isLoading
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsInitialized = createSelector(
  selectPortal,
  (state: IPortalState) => state.isInitialised
);

/**
 * Селектор состояния боковой панели
 */
export const selectIsSidebarOpened = createSelector(
  selectPortal,
  (state: IPortalState) => state.isSidebarOpened
);

/**
 * Селектор режима отображения
 */
export const selectViewMode = createSelector(
  selectPortal,
  (state: IPortalState) => state.viewMode
);






