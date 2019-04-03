import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IApplicationState} from '../application.state';
import { IAuthenticationState } from 'kolenergo-core';

export const selectSession = createFeatureSelector<IApplicationState, IAuthenticationState>('session');

export const selectCurrentUser = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.user
);

export const selectIsAuthenticationInProgress = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.isAuthenticationInProgress
);
