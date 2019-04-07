import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from './authentication.state';
import { IApplicationState } from '../../interfaces';


export const selectCurrentUser = (state: IAuthenticationState) => state.user;
export const selectIsAuthenticationInProgress = createFeatureSelector<IAuthenticationState, boolean>('isAuthenticationInProgress');


export const selectSession = (state: IApplicationState) => state.session;
export const selectIsInProgress = createSelector(
  selectSession,
  (state: IAuthenticationState) => state.isAuthenticationInProgress
);
