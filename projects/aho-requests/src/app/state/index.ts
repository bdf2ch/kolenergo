import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IApplicationState } from './application.state';
export { reducer } from './application.reducers';
export * from './application.state';
export * from './application.actions';
export * from './application.selectors';
/*
export const reducers: ActionReducerMap<IApplicationState> = {
  aho: reducer
};
*/


export const metaReducers: MetaReducer<IApplicationState>[] = !environment.production ? [] : [];
