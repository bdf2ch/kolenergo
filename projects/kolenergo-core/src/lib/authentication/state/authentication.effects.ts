import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as auth from './authentication.actions';
import { AuthenticationService } from '../services/authentication.service';
import {AuthenticationCheck, AuthenticationCheckFail, AuthenticationCheckSuccess, AuthenticationSignIn} from './authentication.actions';
import { IUser } from '../../interfaces/user.interface';
import { IServerResponse } from '../../interfaces/server-response.interface';

@Injectable()
export class AuthenticationEffects {

  constructor(private actions$: Actions,
              private authentication: AuthenticationService,
              private readonly snackBar: MatSnackBar) {}

  @Effect()
  checkSession$ = this.actions$.pipe(
    ofType(auth.actionTypes.AUTHENTICATION_CHECK),
    mergeMap((action: AuthenticationCheck) => this.authentication.checkSession().pipe(
      map((result: IServerResponse<IUser>) => {
        if (result.data) {
          return new AuthenticationCheckSuccess(result.data);
        } else {
          return new AuthenticationCheckFail();
        }
      }),
      catchError(() => {
        return of({type: auth.actionTypes.AUTHENTICATION_CHECK_FAIL});
      })
    ))
  );

  @Effect()
  signIn$ = this.actions$.pipe(
    ofType(auth.actionTypes.AUTHENTICATION_SIGN_IN),
    mergeMap((action: AuthenticationSignIn) => this.authentication.signIn(action.payload.account, action.payload.password)
      .pipe(
        tap(() => console.log('SIGN IN EFFECT')),
        map((result) => {
          console.log('SIGN IN RESULT', result);
          if (result) {
            return {
              type: auth.actionTypes.AUTHENTICATION_SIGN_IN_SUCCESS,
              payload: result
            };
          } else {
            return {
              type: auth.actionTypes.AUTHENTICATION_SIGN_IN_FAIL
            };
          }
        }),
        catchError((error) => {
          console.log('fucking error', error);
          switch (error.status) {
            case 401:
              this.snackBar.open(
                'Пользователь не найден',
                'Закрыть',
                {
                  duration: 3000
                });
              break;
            case 403:
              this.snackBar.open('Доступ запрещен', 'Закрыть');
              break;
          }
          return of({type: auth.actionTypes.AUTHENTICATION_SIGN_IN_FAIL});
        })
      ))
  );

  @Effect()
  signOut$ = this.actions$.pipe(
    ofType(auth.actionTypes.AUTHENTICATION_SIGN_OUT),
    mergeMap(() => this.authentication.signOut()
      .pipe(
        map(() => {
          return {type: auth.actionTypes.AUTHENTICATION_SIGN_OUT_SUCCESS};
        }),
        catchError(() => {
          return of({type: auth.actionTypes.AUTHENTICATION_SIGN_OUT_FAIL});
        })
      )
    )
  );
}
