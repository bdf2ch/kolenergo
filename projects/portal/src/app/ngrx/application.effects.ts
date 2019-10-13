import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IServerResponse } from '@kolenergo/core';
import { IApplicationState } from './application.state';
import { LoadAdvertsNextPage, LoadAdvertsNextPageSuccess, LoadAdvertsPreviousPageSuccess, PortalActionTypes } from './application.actions';
import { PortalService } from '../portal/services/portal.service';
import { IPortalInitialData } from '../portal/interfaces';
import { IAdvert } from '../adverts/interfaces';

@Injectable()
export class ApplicationEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly snackBar: MatSnackBar,
              private readonly portal: PortalService) {}


              /*
  @Effect()
  checkSession$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_CHECK_SUCCESS),
    tap((action: AuthenticationCheckSuccess) => {
      console.log('SESSION CHECK');
    }),
    withLatestFrom(
      this.store.pipe(select(state.selectCurrentUser)),
      this.store.pipe(select(state.selectApplicationInitialized))
    ),
    mergeMap(([action, user, isInitialized]) => {
      if (isInitialized === false) {
        return of(new state.LoadInitialData(user.id));
      } else {
        return EMPTY;
      }
    })
  );
  */

              /*
  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );
  */

/*
  @Effect()
  signInSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    tap(() => {
      const dialog = this.dialog.getDialogById('sign-in-dialog');
      if (dialog) {
        dialog.close();
      }
    }),
    withLatestFrom(
      this.store.pipe(select(state.selectCurrentUser))
    ),
    mergeMap(([action, user]) => {
      return of(new state.LoadInitialData(user.id));
    })
  );

 */

/*
  @Effect()
  signOutSuccess$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS),
    tap(() => {
      this.router.navigate(['/welcome']);
    }),
    mergeMap(() => {
      return EMPTY;
    })
  );

 */

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(PortalActionTypes.LOAD_INITIAL_DATA),
    // withLatestFrom(
    //   this.store.pipe(select(state.selectCurrentUser)),
    //   this.store.pipe(select(state.selectCalendarMode)),
    // ),
    switchMap(() => this.portal.getInitialData()
      .pipe(
        map((response: IServerResponse<IPortalInitialData>) => {
          return {type: PortalActionTypes.LOAD_INITIAL_DATA_SUCCESS, payload: response};
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке данных с сервера произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      )
    )
  );

  @Effect()
  loadAdvertsPreviousPage$ = this.actions$.pipe(
    ofType(PortalActionTypes.LOAD_ADVERTS_PREVIOUS_PAGE),
    mergeMap((action: LoadAdvertsNextPage) => {
      return this.portal.getAdvertsPage(action.payload.page, action.payload.advertsOnPage).pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new LoadAdvertsPreviousPageSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке объявлений произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      );
    })
  );

  @Effect()
  loadAdvertsNextPage$ = this.actions$.pipe(
    ofType(PortalActionTypes.LOAD_ADVERTS_NEXT_PAGE),
    mergeMap((action: LoadAdvertsNextPage) => {
      return this.portal.getAdvertsPage(action.payload.page, action.payload.advertsOnPage).pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new LoadAdvertsNextPageSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке объявлений произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      );
    })
  );
}
