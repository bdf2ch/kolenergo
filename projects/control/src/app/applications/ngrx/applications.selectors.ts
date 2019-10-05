import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationsState } from './applications.state';
import { IApplicationState } from '../../ngrx';

const applications = createFeatureSelector<IApplicationState, IApplicationsState>('applications');

/**
 * Селектор состояние загрузки данных с сервера
 */
export const selectFetchingInProgress = createSelector(
  applications,
  (state: IApplicationsState) => state.fetchingInProgress
);
