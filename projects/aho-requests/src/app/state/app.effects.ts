import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as state from './index';
import {map, mergeMap, tap} from 'rxjs/operators';
import {AhoRequestsActionTypes, LoadInitialData} from './index';
import {EMPTY, of} from 'rxjs';
import {AhoRequestsService} from '../aho-requests/services/aho-requests.service';
import {IAhoRequestsInitialData} from '../aho-requests/interfaces';
import {IServerResponse} from '../../../../kolenergo-core/src/lib/interfaces';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private aho: AhoRequestsService) {}

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(state.AhoRequestsActionTypes.LOAD_INITIAL_DATA),
    tap(() => console.log('LOAD_INITIAL_DATA_EFFECT')),
    mergeMap(() => this.aho.fetchInitialData()
      .pipe(
        map((data: IServerResponse<IAhoRequestsInitialData>) => {
          return {type: AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS, payload: {data: data.data}};
        })
      )
    )
  );
}
