import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationsState } from './applications.state';
import { IApplicationState } from '../../../ngrx/application.state';

const applications = createFeatureSelector<IApplicationState, IApplicationsState>('applications');

/**
 * Селектор списка приложений
 */
export const selectApplications = createSelector(
  applications,
  (app: IApplicationsState) => app.applications
);


/**
 * Селектор выбранного приложения
 */
export const selectSelectedApplication = createSelector(
  applications,
  (state: IApplicationsState) => state.selectedApplication
);
