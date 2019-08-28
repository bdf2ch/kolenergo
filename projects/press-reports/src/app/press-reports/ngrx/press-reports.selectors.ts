import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { IPressReportsState } from './';

/**
 * Селектор дерева параметров портала
 */
export const reports = createFeatureSelector<IApplicationState, IPressReportsState>('reports');

/**
 * Селектор состояния загрузки информации об отчетах
 */
export const selectFetchingInProgress = createSelector(
  reports,
  (state: IPressReportsState) => state.fetchingReportsInProgress
);

/**
 * Селектор состояния добавления отчетов
 */
export const selectAddingInProgress = createSelector(
  reports,
  (state: IPressReportsState) => state.addingReportInProgress
);

/**
 * Селектор состояния удаления отчетов
 */
export const selectDeletingInProgress = createSelector(
  reports,
  (state: IPressReportsState) => state.deletingInProgress
);


/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  reports,
  (state: IPressReportsState) => state.date
);

/**
 * Селектор выбранной даты
 */
export const selectSelectedDate = createSelector(
  reports,
  (state: IPressReportsState) => state.selectedDate
);

/**
 * Селектор организаций
 */
export const selectCompanies = createSelector(
  reports,
  (state: IPressReportsState) => state.companies
);

/**
 * Селектор отчетов о публикациях в СМИ
 */
export const selectReports = createSelector(
  reports,
  (state: IPressReportsState) => state.reports
);
