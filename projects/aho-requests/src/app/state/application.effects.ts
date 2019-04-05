import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, Effect, ofType } from '@ngrx/effects';
import * as state from './index';
import {
  AhoRequestsActionTypes,
  ApplicationModes,
  IApplicationState,
  selectCurrentPage,
  selectFilters,
  selectIsFiltersApplied,
  SelectRequestsMode,
  LoadExpiredRequests,
  selectItemsOnPage,
  LoadInitialData,
  LoadRequestDetails,
  IAhoState,
  selectCurrentUser,
  LoadAllRequests, LoadOwnRequests, ResetRequests
} from './index';
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import {combineLatest, EMPTY} from 'rxjs';
import { AhoRequestsService } from '../aho-requests/services/aho-requests.service';
import { IAhoRequest, IAhoRequestsInitialData } from '../aho-requests/interfaces';
import { IServerResponse, actionTypes, SignInComponent } from 'kolenergo-core';
import { select, Store } from '@ngrx/store';
import {FilterManager} from '../aho-requests/models';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { of } from 'rxjs/internal/observable/of';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import * as auth from '../../../../kolenergo-core/src/lib/authentication/state/authentication.actions';

@Injectable()
export class ApplicationEffects {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly router: Router,
              private readonly dialog: MatDialog,
              private readonly aho: AhoRequestsService) {
  }

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      // this.dialogRef.close();
      this.router.navigate(['/']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(auth.actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('sign-in-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return of(new LoadInitialData(user.id));
    })
  );

  @Effect()
  signOutSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/welcome']);
    }),
    mergeMap(() => {
      return of(new ResetRequests());
    })
  );

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
      this.store.pipe(select(selectCurrentUser)),
      this.store.pipe(select(selectFilters)),
      this.store.pipe(select(selectCurrentPage)),
      this.store.pipe(select(selectItemsOnPage))
    ),
    mergeMap(([action, user, filters, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        filters.getFilterById('start-date').getValue() ? filters.getFilterById('start-date').getValue().getTime() : 0,
        filters.getFilterById('end-date').getValue() ? filters.getFilterById('end-date').getValue().getTime() : 0,
        user.permissions.getRoleByCode('aho_requests_administrator') ? 0 : user.id,
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
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return user.permissions.getRoleByCode('aho_requests_administrator')
        ? of({type: AhoRequestsActionTypes.LOAD_ALL_REQUESTS})
        : of({type: AhoRequestsActionTypes.LOAD_OWN_REQUESTS});
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
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser)),
      this.store.pipe(select(selectCurrentPage)),
      this.store.pipe(select(selectItemsOnPage))
    ),
    mergeMap(([action, user, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        0,
        0,
        user.id,
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
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser)),
      this.store.pipe(select(selectCurrentPage)),
      this.store.pipe(select(selectItemsOnPage))
    ),
    mergeMap(([action, user, page, itemsOnPage]) =>
      this.aho.fetchRequests(
        0,
        0,
        0,
        user.id,
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
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser)),
      this.store.pipe(select(selectItemsOnPage))
    ),
    mergeMap(([action, user, itemsOnPage]) => this.aho.fetchInitialData(user.id, itemsOnPage)
      .pipe(
        map((data: IServerResponse<IAhoRequestsInitialData>) => {
          return {type: AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS, payload: {data: data.data}};
        })
      )
    )
  );

  @Effect()
  loadInitialDataSuccess$ = this.actions$.pipe(
    ofType(state.AhoRequestsActionTypes.INITIAL_DATA_LOAD_SUCCESS),
    withLatestFrom(
      this.store.pipe(select(selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return user.permissions.getRoleByCode('aho_requests_administrator')
      ? of({type: AhoRequestsActionTypes.LOAD_ALL_REQUESTS}) : of({type: AhoRequestsActionTypes.LOAD_OWN_REQUESTS});
    })
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
