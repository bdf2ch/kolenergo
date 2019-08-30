import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import {EMPTY, from, of} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { IServerResponse } from '@kolenergo/core';
import {
  AdvertsAddAdvert,
  AdvertsAddAdvertSuccess,
  AdvertsActionTypes,
  AdvertsEditAdvertSuccess,
  AdvertsLoadAdvertsSuccess,
  AdvertsUploadAttachmentToAdvert,
  AdvertsUploadAttachmentToAdvertSuccess,
  AdvertsUploadAttachmentToNewAdvert,
  AdvertsUploadAttachmentToNewAdvertSuccess,
  AdvertsLoadAdvertsNextPageSuccess,
  AdvertsSearchAdverts, AdvertsSearchAdvertsSuccess, AdvertsLoadAdverts, AdvertsUploadImageToNewAdvertSuccess, AdvertsUploadImageToNewAdvert
} from './adverts.actions';
import {selectAdvertsOnPage, selectNewAdvert, selectPage, selectTotalPages} from './adverts.selectors';
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
    ofType(AdvertsActionTypes.ADVERTS_LOAD_ADVERTS),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectAdvertsOnPage))
    ),
    switchMap(([action, page, advertsOnPage]) => this.adverts.getAdvertsPage(page, advertsOnPage)
      .pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new AdvertsLoadAdvertsSuccess(response);
        })
      )
    )
  );

  @Effect()
  loadAdvertsNextPage$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_NEXT_PAGE),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectTotalPages)),
      this.store.pipe(select(selectAdvertsOnPage))
    ),
    switchMap(([action, page, totalPages, advertsOnPage]) => {
      if (page < totalPages) {
        return this.adverts.getAdvertsPage(page + 1, advertsOnPage).pipe(
          map((response: IServerResponse<IAdvert[]>) => {
            return new AdvertsLoadAdvertsNextPageSuccess(response);
          })
        );
      } else {
        return EMPTY;
      }
    })
  );

  @Effect()
  addAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_ADD_AVERT),
    switchMap((action: AdvertsAddAdvert) => this.adverts.addAdvert(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          this.snackBar.open('Объявление добавлено', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return new AdvertsAddAdvertSuccess(response);
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
    ofType(AdvertsActionTypes.ADVERTS_EDIT_ADVERT),
    switchMap((action: AdvertsAddAdvert) => this.adverts.editAdvert(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          return new AdvertsEditAdvertSuccess(response);
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

  @Effect()
  searchAdverts$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_SEARCH_ADVERTS),
    switchMap((action: AdvertsSearchAdverts) => this.adverts.searchAdverts(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new AdvertsSearchAdvertsSuccess(response);
        },
          catchError((error: any) => {
            console.error('error occurred: ', error);
            this.snackBar.open('При поиске объявлений произошла ошибка', 'Закрыть', {
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              duration: 3000
            });
            return EMPTY;
          })
      ))
  ));

  @Effect()
  clearSearch$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_CLEAR_SEARCH),
    switchMap(() => {
      return of(new AdvertsLoadAdverts());
    })
  );

  @Effect()
  uploadImageToNewAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT),
    switchMap((action: AdvertsUploadImageToNewAdvert) => from(this.adverts.uploadImage(action.payload.file, 0, action.payload.header))
      .pipe(
        map((response: IServerResponse<{url: string, advert: IAdvert}>) => {
          return new AdvertsUploadImageToNewAdvertSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке изображения произошла ошибка', 'Закрыть', {
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
  uploadAttachmentToNewAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT),
    switchMap((action: AdvertsUploadAttachmentToNewAdvert) => this.adverts.uploadAttachment(action.payload[0])
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          return new AdvertsUploadAttachmentToNewAdvertSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке вложения произошла ошибка', 'Закрыть', {
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
  uploadAttachmentToAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT),
    withLatestFrom(
      this.store.pipe(select(selectNewAdvert))
    ),
    switchMap(([action, advert]) => this.adverts.uploadAttachment((action as AdvertsUploadAttachmentToAdvert).payload[0], advert.id)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          return new AdvertsUploadAttachmentToAdvertSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке вложения произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      )
    )
  );
}
