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
export const selectLoadingInProgress = createSelector(
  selectPortal,
  (state: IPortalState) => state.isLoading
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectApplicationInitialized = createSelector(
  selectPortal,
  (state: IPortalState) => state.isInitialised
);

/**
 * Селектор состояния боковой панели
 */
export const selectSidebarOpened = createSelector(
  selectPortal,
  (state: IPortalState) => state.isSidebarOpened
);





