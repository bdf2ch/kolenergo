import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IApplicationState } from './application.state';
export * from './application.state';

/*
export const reducers: ActionReducerMap<IApplicationState> = {};
*/


export const metaReducers: MetaReducer<IApplicationState>[] = !environment.production ? [] : [];
