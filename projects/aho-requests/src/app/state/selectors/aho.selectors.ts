import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAhoState, IApplicationState } from '../application.state';

export const selectAho = createFeatureSelector<IApplicationState, IAhoState>('aho');

export const selectRequestTypes = createSelector(
  selectAho,
  (state: IAhoState) => state.requestTypes
);

export const selectRequestStatuses = createSelector(
  selectAho,
  (state: IAhoState) => state.requestStatuses
);

export const selectEmployees = createSelector(
  selectAho,
  (state: IAhoState) => state.employees
);

export const selectRequestRejectReasons = createSelector(
  selectAho,
  (state: IAhoState) => state.requestRejectReasons
);

export const selectMode = createSelector(
  selectAho,
  (state: IAhoState) => state.mode
);

export const selectApplicationInitialized = createSelector(
  selectAho,
  (state: IAhoState) => state.isApplicationInitialized
);

export const selectFetchingDataInProgress = createSelector(
  selectAho,
  (state: IAhoState) => state.fetchingDataInProgress
);

export const selectFilters = createSelector(
  selectAho,
  (state: IAhoState) => state.filters
);

export const selectRequests = createSelector(
  selectAho,
  (state: IAhoState) => state.requests
);

export const selectTotalRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.totalRequestsCount
);

export const selectNewRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.newRequestsCount
);

export const selectOwnRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.ownRequestsCount
);

export const selectOwnUncompletedRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.ownUncompletedRequestsCount
);

export const selectEmployeeRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.employeeRequestsCount
);

export const selectEmployeeUncompletedRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.employeeUncompletedRequestsCount
);

export const selectExpiredRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.expiredRequestsCount
);

export const selectFilteredRequestsCount = createSelector(
  selectAho,
  (state: IAhoState) => state.filteredRequestsCount
);

export const selectIsFiltersApplied = createSelector(
  selectAho,
  (state: IAhoState) => state.isFiltersApplied
);

export const selectSelectedRequest = createSelector(
  selectAho,
  (state: IAhoState) => state.selectedRequest
);

export const selectTotalPagesCount = createSelector(
  selectAho,
  (state: IAhoState) => state.totalPages
);

export const selectCurrentPage = createSelector(
  selectAho,
  (state: IAhoState) => state.currentPage
);

export const selectItemsOnPage = createSelector(
  selectAho,
  (state: IAhoState) => state.itemsOnPage
);
