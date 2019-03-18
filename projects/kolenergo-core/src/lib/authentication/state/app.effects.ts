import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions,
              private authentication: AuthenticationService) {}


              @Effect()
  signIn$ = this.authentication.s
}
