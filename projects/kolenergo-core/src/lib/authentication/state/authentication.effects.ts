import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as auth from './authentication.actions';
import { AuthenticationService } from '../services/authentication.service';
import { actionTypes, AuthenticationSignIn, AuthenticationSuccess } from './authentication.actions';
import { User } from '../../models';

@Injectable()
export class AuthenticationEffects {

  constructor(private actions$: Actions,
              private authentication: AuthenticationService,
              private snackBar: MatSnackBar) {}

  @Effect()
    signIn$ = this.actions$
      .pipe(
        ofType(auth.actionTypes.AUTHENTICATION_SIGN_IN),
        mergeMap((action: AuthenticationSignIn) => this.authentication.signIn(action.payload.account, action.payload.password)
          .pipe(
            tap(() => console.log('SIGN IN EFFECT')),
            map((result) => {
              console.log('SIGN IN RESULT', result);
              if (result) {
                return {
                  type: auth.actionTypes.AUTHENTICATION_SUCCESS,
                  payload: result
                };
              } else {
                return {
                  type: auth.actionTypes.AUTHENTICATION_FAIL
                };
              }
            }),
            catchError(() => {
              console.log('fucking error');
              return of({type: auth.actionTypes.AUTHENTICATION_FAIL});
            })
          ))
      );
}
