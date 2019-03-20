import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from './authentication.state';
import { IUser } from '../../interfaces';

export const selectUser = createFeatureSelector<IAuthenticationState, IUser>('user');
export const selectFetchingDataInProgress = createFeatureSelector<IAuthenticationState, boolean>('isFetchingData');
