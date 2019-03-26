import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as state from './index';
import {
  AhoRequestsActionTypes,
  ApplicationModes,
  IApplicationState,
  selectCurrentPage, selectFilters,
  SelectRequestsMode, LoadExpiredRequests
} from './index';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import { AhoRequestsService } from '../aho-requests/services/aho-requests.service';
import { IAhoRequest, IAhoRequestsInitialData } from '../aho-requests/interfaces';
import { IServerResponse } from '../../../../kolenergo-core/src/lib/interfaces';
import { select, Store } from '@ngrx/store';
import {FilterManager} from '../aho-requests/models';

@Injectable()
export class ApplicationEffects {
  currentPage: number;

  constructor(private store: Store<IApplicationState>,
              private actions$: Actions,
              private aho: AhoRequestsService) {
  }

  @Effect()
  showExpiredRequests$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectCurrentPage)), this.store.pipe(select(selectFilters))),
    mergeMap(([action, page, filters]) =>
       this.aho.fetchRequests(
        0,
        0,
        0,
        0,
        0,
        0,
        true,
        page,
        20
      ).pipe(
        map((response: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) => {
          return {type: AhoRequestsActionTypes.LOAD_EXPIRED_REQUESTS_SUCCESS, payload: response};
        })
      )
  ));

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

  @Effect()
  loadRequests$ = this.actions$.pipe(
    ofType(state.AhoRequestsActionTypes.LOAD_REQUESTS),
    tap(() => console.log('LOAD_REQUESTS_EFFECT')),
    withLatestFrom(this.store.pipe(select(selectCurrentPage))),
    switchMap(([action, page]) => this.aho.fetchRequests(0, 0, 0, 0, 0, 0, false, (page + 1), 20, null)
      .pipe(
        map((response: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) => {
          return {type: AhoRequestsActionTypes.LOAD_REQUESTS_SUCCESS, payload: {data: {...response.data, page: page + 1}}};
        })
      )
    )
  );
}
