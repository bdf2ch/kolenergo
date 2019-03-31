import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as state from './index';
import {
  AhoRequestsActionTypes,
  ApplicationModes,
  IApplicationState,
  selectCurrentPage, selectFilters,
  SelectRequestsMode, LoadExpiredRequests, selectItemsOnPage, LoadInitialData, LoadRequestDetails
} from './index';
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import { AhoRequestsService } from '../aho-requests/services/aho-requests.service';
import { IAhoRequest, IAhoRequestsInitialData } from '../aho-requests/interfaces';
import { IServerResponse } from '../../../../kolenergo-core/src/lib/interfaces';
import { select, Store } from '@ngrx/store';
import {FilterManager} from '../aho-requests/models';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { of } from 'rxjs/internal/observable/of';

@Injectable()
export class ApplicationEffects {

  constructor(private store: Store<IApplicationState>,
              private actions$: Actions,
              private aho: AhoRequestsService) {
  }

  /*
  @Effect()
  routeNavigation = this.actions$.pipe(
    ofType(ROUTER_NAVIGATION),
    tap((action) => {
      console.log('ROUTER EFFECT', action.payload.event.state.root.children["0"].firstChild.firstChild.routeConfig.path);
      return action.payload.event.state.root.children["0"].firstChild.firstChild.routeConfig.path;
    }),
    switchMap((action) => {
        return {type: 'hfghf', payload: action.payload.event.state.root.children["0"].firstChild.firstChild.routeConfig.path};
    })
  );
   */

  @Effect()
  loadRequestDetails$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.LOAD_REQUEST_DETAILS),
    mergeMap( (action: LoadRequestDetails) => this.aho.fetchRequestById(action.payload)
      .pipe(
        map((response: IAhoRequest) => {
          return {type: AhoRequestsActionTypes.LOAD_REQUEST_DETAILS_SUCCESS, payload: response};
        })
      ))
  );

  @Effect()
  loadFilteredRequests$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.APPLY_FILTERS),
    withLatestFrom(
      this.store.pipe(select(selectFilters)),
      this.store.pipe(select(selectCurrentPage)),
      this.store.pipe(select(selectItemsOnPage))
    ),
    mergeMap(([action, filters, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        filters.getFilterById('start-date').getValue() ? filters.getFilterById('start-date').getValue().getTime() : 0,
        filters.getFilterById('end-date').getValue() ? filters.getFilterById('end-date').getValue().getTime() : 0,
        0,
        filters.getFilterById('request-employee').getValue() ? filters.getFilterById('request-employee').getValue().id : 0,
        filters.getFilterById('request-type').getValue() ? filters.getFilterById('request-type').getValue().id : 0,
        filters.getFilterById('request-status').getValue() ? filters.getFilterById('request-status').getValue().id : 0,
        false,
        page,
        itemsOnPage
      ).pipe(
        map((response: IServerResponse<{ requests: IAhoRequest[], totalRequests: number }>) => {
          return {type: AhoRequestsActionTypes.FILTERED_REQUESTS_LOAD_SUCCESS, payload: response};
        })
      )
    )
  );

  @Effect()
  resetFilters$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.RESET_FILTERS),
    map(() => {
      return { type: AhoRequestsActionTypes.LOAD_OWN_REQUESTS };
    })
  );

  @Effect()
  loadAllRequests$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.LOAD_ALL_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectCurrentPage)), this.store.pipe(select(selectItemsOnPage))),
    mergeMap(([action, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        0,
        0,
        0,
        0,
        0,
        0,
        false,
        page,
        itemsOnPage
      ).pipe(
        map((response: IServerResponse<{ requests: IAhoRequest[], totalRequests: number, newRequestsCount: number }>) => {
          return {type: AhoRequestsActionTypes.LOAD_ALL_REQUESTS_SUCCESS, payload: response};
        })
      )
    )
  );

  @Effect()
  loadOwnRequests$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.LOAD_OWN_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectCurrentPage)), this.store.pipe(select(selectItemsOnPage))),
    mergeMap(([action, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        0,
        0,
        34,
        0,
        0,
        0,
        false,
        page,
        itemsOnPage
      ).pipe(
        map((response: IServerResponse<{ requests: IAhoRequest[], totalRequests: number, newRequestsCount: number }>) => {
          return {type: AhoRequestsActionTypes.LOAD_OWN_REQUESTS_SUCCESS, payload: response};
        })
      ))
  );

  @Effect()
  loadEmployeeRequests$ = this.actions$.pipe(
    ofType(AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS),
    withLatestFrom(this.store.pipe(select(selectCurrentPage)), this.store.pipe(select(selectItemsOnPage))),
    mergeMap(([action, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        0,
        0,
        0,
        34,
        0,
        0,
        false,
        page,
        itemsOnPage
      ).pipe(
        map((response: IServerResponse<{ requests: IAhoRequest[], totalRequests: number, newRequestsCount: number }>) => {
          return {type: AhoRequestsActionTypes.LOAD_EMPLOYEE_REQUESTS_SUCCESS, payload: response};
        })
      ))
  );

  @Effect()
  loadExpiredRequests$ = this.actions$.pipe(
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
    mergeMap((action: LoadInitialData) => this.aho.fetchInitialData(action.payload)
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
