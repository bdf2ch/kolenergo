import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from './authentication.state';


export const selectCurrentUser = (state: IAuthenticationState) => state.user;
export const selectIsAuthenticationInProgress = (state: IAuthenticationState) => state.isAuthenticationInProgress;

