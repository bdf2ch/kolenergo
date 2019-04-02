import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAuthenticationState } from './authentication.state';

// export const selectCurrentUser = createFeatureSelector<IAuthenticationState, IUser>('user');
export const selectFetchingDataInProgress = createFeatureSelector<IAuthenticationState, boolean>('isFetchingData');


export const selectCurrentUser = createSelector(
  (state: IAuthenticationState) => state.user
);

export const selectIsFetchingData = createSelector(
  (state: IAuthenticationState) => state.isFetchingData
);

