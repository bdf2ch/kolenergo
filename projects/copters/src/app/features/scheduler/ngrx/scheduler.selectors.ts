import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ISchedulerState } from './scheduler.state';
import { IApplicationState } from '../../../ngrx';

/**
 * Селектор раздела управления заявками на облет
 */
export const selectScheduler = createFeatureSelector<IApplicationState, ISchedulerState>('scheduler');

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectLoadingInProgress = createSelector(
  selectScheduler,
  (state: ISchedulerState) => state.isLoading
);
