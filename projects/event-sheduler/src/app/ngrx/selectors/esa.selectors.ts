import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState, IEventShedulerState } from '../app.state';

/**
 * Селектор дерева параметров планировщика меропряитий
 */
export const selectEsa = createFeatureSelector<IApplicationState, IEventShedulerState>('esa');

/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.date
);

/**
 * Селектор списка организаций
 */
export const selectCompanies = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.companies
);


/**
 * Селектор состояния загрузки данных
 */
export const selectFetchingDataInProgress = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.fetchingDataInProgress
);

/**
 * Селектор состояния инициализации приложения
 */
export const selectApplicationInitialized = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.applicationInitialized
);

/**
 * Селектор типов мероприятий
 */
export const selectEventTypes = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.types
);

/**
 * Селектор интервалов повторения мероприятий
 */
export const selectIntervals = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.intervals
);

/**
 * Селектор фильтров поиска
 */
export const selectFilters = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.filters
);

/**
 * Селектор даты начала периода
 */
export const selectPeriodStart = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.periodStart
);

/**
 * Селектор даты окончания периода
 */
export const selectPeriodEnd = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.periodEnd
);

/**
 * Селектор режима календаря
 */
export const selectCalendarMode = createSelector(
  selectEsa,
  (state: IEventShedulerState) => state.calendarMode
);



