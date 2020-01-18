import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Actions, Effect, ofType } from '@ngrx/effects';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import {actionTypes, AuthenticationCheckSuccess} from '@kolenergo/core';
import {select, Store} from '@ngrx/store';
import {selectCompanyById} from './application.selectors';
import {IApplicationState} from './application.state';
import {PhoneBookSelectCompany} from './application.actions';


@Injectable({
  providedIn: 'root'
})
export class SessionEffects {
  constructor(
    private readonly store: Store<IApplicationState>,
    private readonly actions$: Actions,
    private readonly dialog: MatDialog,
  ) {}

  @Effect()
  checkSession$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_CHECK_SUCCESS),
    switchMap((action) => {
      console.log('SESSION CHECK', action);
      if ((action as AuthenticationCheckSuccess).payload.company) {
        return of(new PhoneBookSelectCompany((action as AuthenticationCheckSuccess).payload.company.id));
      }
      return EMPTY;
    })
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS),
    switchMap(() => {
      console.log('SIGN IN OK');
      this.dialog.getDialogById('sign-in-dialog').close();
      return EMPTY;
    })
  );
}
