import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationsState } from './applications.state';
import { IApplicationState } from '../../../ngrx';

const applications = createFeatureSelector<IApplicationState, IApplicationsState>('applications');

/**
 * Селектор выбранного приложения
 */
export const selectSelectedApplication = createSelector(
  applications,
  (state: IApplicationsState) => state.selectedApplication
);
