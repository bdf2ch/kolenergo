import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState } from './application.state';

export const aho = (state: IApplicationState) => state['aho'];

export const selectRequestTypes = createSelector(
  aho,
  (state: IApplicationState) => state.requestTypes
);

export const selectRequestStatuses = createSelector(
  aho,
  (state: IApplicationState) => state.requestStatuses
);

export const selectEmployees = createSelector(
  aho,
  (state: IApplicationState) => state.employees
);

export const selectRequestRejectReasons = createSelector(
  aho,
  (state: IApplicationState) => state.requestRejectReasons
);

export const selectMode = createSelector(
  aho,
  (state: IApplicationState) => state.mode
);

export const selectFetchingDataInProgress = createSelector(
  aho,
  (state: IApplicationState) => state.fetchingDataInProgress
);


export const selectFilters = createSelector(
  aho,
  (state: IApplicationState) => state.filters
);

export const selectRequests = createSelector(
  aho,
  (state: IApplicationState) => state.requests
);

export const selectTotalRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.totalRequestsCount
);

export const selectNewRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.newRequestsCount
);

export const selectOwnRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.ownRequestsCount
);

export const selectOwnUncompletedRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.ownUncompletedRequestsCount
);

export const selectEmployeeRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.employeeRequestsCount
);

export const selectEmployeeUncompletedRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.employeeUncompletedRequestsCount
);

export const selectExpiredRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.expiredRequestsCount
);

export const selectFilteredRequestsCount = createSelector(
  aho,
  (state: IApplicationState) => state.filteredRequestsCount
);

export const selectIsFiltersApplied = createSelector(
  aho,
  (state: IApplicationState) => state.isFiltersApplied
);

export const selectSelectedRequest = createSelector(
  aho,
  (state: IApplicationState) => state.selectedRequest
);

export const selectTotalPagesCount = createSelector(
  aho,
  (state: IApplicationState) => state.totalPages
);

export const selectCurrentPage = createSelector(
  aho,
  (state: IApplicationState) => state.currentPage
);

export const selectItemsOnPage = createSelector(
  aho,
  (state: IApplicationState) => state.itemsOnPage
);
