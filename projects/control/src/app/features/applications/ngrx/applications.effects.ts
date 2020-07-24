import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material';

import {map, mergeMap, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../interfaces';
import { IApplicationState } from '../../../ngrx/application.state';
import { ApplicationsActionTypes, ApplicationsLoadApplicationsSuccess } from './applications.actions';
import { ApplicationsService } from '../../../services/applications.service';




@Injectable()
export class ApplicationsEffects {
  constructor(private readonly router: Router,
              // private readonly dialog: MatDialog,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly applications: ApplicationsService) {}

  @Effect()
  loadApplications$ = this.actions$.pipe(
    ofType(ApplicationsActionTypes.LOAD_APPLICATIONS),
    switchMap(() => this.applications.getApplications()
      .pipe(
        map((response: IServerResponse<IApplication[]>) => {
          return new ApplicationsLoadApplicationsSuccess(response);
        })
      )
    )
  );
}
