import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IRequestsState } from './requests.state';
import { IApplicationState } from '../../../ngrx';

/**
 * Селектор дерева параметров ядра приложения
 */
export const requests = createFeatureSelector<IApplicationState, IRequestsState>('requests');

/**
 * Селектор состояния инициализации приложения
 */
export const selectNewRequest = createSelector(
  requests,
  (state: IRequestsState) => state.newRequest
);

/**
 * Селектор списка заявок
 */
export const selectRequests = createSelector(
  requests,
  (state: IRequestsState) => state.requests
);

