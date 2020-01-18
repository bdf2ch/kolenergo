import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import {map, switchMap} from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import { IServerResponse } from '@kolenergo/core';
import { PhoneBookActionTypes, PhoneBookLoadInitialDataSuccess } from './application.actions';
import { ApplicationService } from '../services/application.service';
import { IInitialData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly application: ApplicationService
  ) {}

  @Effect()
  loadInitialData$ = this.actions$.pipe(
    ofType(PhoneBookActionTypes.PHONE_BOOK_LOAD_INITIAL_DATA),
    switchMap(() => this.application.getInitialData()
      .pipe(
        map((response: IServerResponse<IInitialData>) => {
          return new PhoneBookLoadInitialDataSuccess(response);
        })
      )
    ));
}
