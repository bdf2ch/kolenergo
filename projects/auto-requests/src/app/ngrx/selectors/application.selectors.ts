import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState, IAppState } from '../application.state';

/**
 * Селектор дерева параметров ядра приложения
 */
export const selectApplication = createFeatureSelector<IApplicationState, IAppState>('app');

/**
 * Селектор состояния инициализации приложения
 */
export const selectIsInitialized = createSelector(
  selectApplication,
  (state: IAppState) => state.isInitialized
);

/**
 * Селектор состояния загрузки данных с сервера
 */
export const selectIsLoading = createSelector(
  selectApplication,
  (state: IAppState) => state.isLoading
);

/**
 * Селектор состояния компактного отображения
 */
export const selectIsCompactMode = createSelector(
  selectApplication,
  (state: IAppState) => state.isCompactMode
);

/**
 * Селектор состояния боковой панели
 */
export const selectIsSidebarOpened = createSelector(
  selectApplication,
  (state: IAppState) => state.isSidebarOpened
);

/**
 * Селектор начала периода календаря
 */
export const selectCalendarPeriodStart = createSelector(
  selectApplication,
  (state: IAppState) => state.calendarPeriodStart
);

/**
 * Селектор окончания периода календаря
 */
export const selectCalendarPeriodEnd = createSelector(
  selectApplication,
  (state: IAppState) => state.calendarPeriodEnd
);

/**
 * Селектор филтров заявок
 */
export const selectFilters = createSelector(
  selectApplication,
  (state: IAppState) => state.filters
);

/**
 * Селектор строки поиска
 */
export const selectSearch = createSelector(
  selectApplication,
  (state: IAppState) => state.search
);

/**
 * Селектор режима отображения заявок
 */
export const selectViewMode = createSelector(
  selectApplication,
  (state: IAppState) => state.viewMode
);

/**
 * Селектор режима отображения списка заявок
 */
export const selectListMode = createSelector(
  selectApplication,
  (state: IAppState) => state.listMode
);

/**
 * Селектор текущей даты
 */
export const selectDate = createSelector(
  selectApplication,
  (state: IAppState) => state.date
);

/**
 * Селектор выбранной даты
 */
export const selectSelectedDate = createSelector(
  selectApplication,
  (state: IAppState) => state.selectedDate
);

/**
 * Селектор транспорта
 */
export const selectTransport = createSelector(
  selectApplication,
  (state: IAppState) => state.transport
);

/**
 * Селектор водителей
 */
export const selectDrivers = createSelector(
  selectApplication,
  (state: IAppState) => state.drivers
);

/**
 * Селектор статусов заявки
 */
export const selectStatuses = createSelector(
  selectApplication,
  (state: IAppState) => state.statuses
);

/**
 * Селектор причин отклонения заявки заявки
 */
export const selectRejectReasons = createSelector(
  selectApplication,
  (state: IAppState) => state.rejectReasons
);

/**
 * Селектор элементов маршрута
 */
export const selectRoutes = createSelector(
  selectApplication,
  (state: IAppState) => state.routes
);

/**
 * Селектор транспорта, доступного для выбора
 */
export const selectAvailableTransport = createSelector(
  selectApplication,
  (state: IAppState) => state.availableTransport
);

/**
 * Селектор водителей, доступных для выбора
 */
export const selectAvailableDrivers = createSelector(
  selectApplication,
  (state: IAppState) => state.availableDrivers
);



