import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IServerResponse } from '@kolenergo/core';
import {AddAdvert, AddAdvertSuccess, AdvertsActionTypes, EditAdvertSuccess, LoadAdvertsSuccess} from './adverts.actions';
import { selectAdvertsOnPage, selectPage } from './adverts.selectors';
import { IAdvert } from '../interfaces';
import { AdvertsService } from '../services/adverts.service';
import { IApplicationState } from '../../ngrx/application.state';

@Injectable()
export class AdvertsEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly snackBar: MatSnackBar,
              private readonly adverts: AdvertsService) {}


  @Effect()
  loadAdverts$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.LOAD_ADVERTS),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectAdvertsOnPage))
    ),
    switchMap(([action, page, advertsOnPage]) => this.adverts.getAdvertsPage(page, advertsOnPage)
      .pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new LoadAdvertsSuccess(response);
        })
      )
    )
  );

  @Effect()
  addAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADD_AVERT),
    switchMap((action: AddAdvert) => this.adverts.addAdvert(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          this.snackBar.open('Объявление добавлено', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return new AddAdvertSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При добавлении объявления произошла ошибка', 'Закрыть', {
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
  editAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.EDIT_ADVERT),
    switchMap((action: AddAdvert) => this.adverts.editAdvert(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          return new EditAdvertSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При сохранении объявления произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      ))
  );
}
