import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAhoState, IApplicationState } from '../application.state';

export const aho = createFeatureSelector<IApplicationState, IAhoState>('aho');

export const selectRequestTypes = createSelector(
  aho,
  (state: IAhoState) => state.requestTypes
);

export const selectRequestStatuses = createSelector(
  aho,
  (state: IAhoState) => state.requestStatuses
);

export const selectEmployees = createSelector(
  aho,
  (state: IAhoState) => state.employees
);

export const selectRequestRejectReasons = createSelector(
  aho,
  (state: IAhoState) => state.requestRejectReasons
);

export const selectMode = createSelector(
  aho,
  (state: IAhoState) => state.mode
);

export const selectApplicationInitialized = createSelector(
  aho,
  (state: IAhoState) => state.isApplicationInitialized
);

export const selectFetchingDataInProgress = createSelector(
  aho,
  (state: IAhoState) => state.fetchingDataInProgress
);

export const selectFilters = createSelector(
  aho,
  (state: IAhoState) => state.filters
);

export const selectRequests = createSelector(
  aho,
  (state: IAhoState) => state.requests
);

export const selectTotalRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.totalRequestsCount
);

export const selectNewRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.newRequestsCount
);

export const selectOwnRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.ownRequestsCount
);

export const selectOwnUncompletedRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.ownUncompletedRequestsCount
);

export const selectEmployeeRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.employeeRequestsCount
);

export const selectEmployeeUncompletedRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.employeeUncompletedRequestsCount
);

export const selectExpiredRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.expiredRequestsCount
);

export const selectFilteredRequestsCount = createSelector(
  aho,
  (state: IAhoState) => state.filteredRequestsCount
);

export const selectIsFiltersApplied = createSelector(
  aho,
  (state: IAhoState) => state.isFiltersApplied
);

export const selectSelectedRequest = createSelector(
  aho,
  (state: IAhoState) => state.selectedRequest
);

export const selectTotalPagesCount = createSelector(
  aho,
  (state: IAhoState) => state.totalPages
);

export const selectCurrentPage = createSelector(
  aho,
  (state: IAhoState) => state.currentPage
);

export const selectItemsOnPage = createSelector(
  aho,
  (state: IAhoState) => state.itemsOnPage
);
