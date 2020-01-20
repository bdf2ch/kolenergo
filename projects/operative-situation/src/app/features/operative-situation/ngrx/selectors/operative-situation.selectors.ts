import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IOperativeSituationState} from '../operative-situation.state';
import { IApplicationState } from '../../../../ngrx';

/**
 * Селектор раздела с отчетами по оперативной обстановке
 */
export const selectOSR = createFeatureSelector<IApplicationState, IOperativeSituationState>('osr');

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectLoadingInProgress = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.isLoadingInProgress
);

/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  selectOSR,
  (state: IOperativeSituationState) => state.date
);
