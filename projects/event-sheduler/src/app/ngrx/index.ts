import { MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { IApplicationState } from './app.state';
export *  from './app.reducers';
export * from './app.state';
export * from './app.actions';
export * from './selectors';

export const metaReducers: MetaReducer<IApplicationState>[] = !environment.production ? [] : [];
