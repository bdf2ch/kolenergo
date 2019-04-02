import { createSelector } from '@ngrx/store';

import { IApplicationState } from '../application.state';
import { IAuthenticationState } from '../../../../../kolenergo-core/src/lib/authentication/state/authentication.state';

export const session = (state: IApplicationState) => state.session;

export const selectCurrentUser = createSelector(
  session,
  (state: IAuthenticationState) => state.user
);

export const selectIsFetchingData = createSelector(
  session,
  (state: IAuthenticationState) => state.isFetchingData
);
