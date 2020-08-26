import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

import { EMPTY, from, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
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
  AdvertsUploadAttachmentToNewAdvertSuccess,
  AdvertsLoadAdvertsNextPageSuccess,
  AdvertsSearchAdverts,
  AdvertsSearchAdvertsSuccess,
  AdvertsLoadAdverts,
  AdvertsUploadImageToNewAdvertSuccess,
  AdvertsUploadImageToNewAdvert,
  AdvertsUploadImageToAdvertSuccess,
  AdvertsUploadImageToAdvert,
  AdvertsDeleteAdvert,
  AdvertsDeleteAdvertSuccess,
  AdvertsDeleteAttachment,
  AdvertsDeleteAttachmentSuccess,
  AdvertsDeleteAttachmentFromNewAdvertSuccess,
  AdvertsLoadAdvert,
  AdvertsLoadAdvertSuccess, AdvertsEditAdvert, AdvertsLoadSimilarAdverts, AdvertsLoadSimilarAdvertsSuccess
} from './adverts.actions';
import {
  selectAdvertsOnPage,
  selectNewAdvert,
  selectPage,
  selectSelectedAdvert,
  selectTotalPages
} from './adverts.selectors';
import { IAdvert } from '../interfaces';
import { Advert } from '../models';
import { AdvertsService } from '../services/adverts.service';
import { IApplicationState } from '../../ngrx/application.state';

@Injectable()
export class AdvertsEffects {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>,
              private readonly actions$: Actions,
              private readonly snackBar: MatSnackBar,
              private readonly dialog: MatDialog,
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
  loadAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_LOAD_ADVERT),
    switchMap((action: AdvertsLoadAdvert) => this.adverts.getAdvert(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          return new AdvertsLoadAdvertSuccess(response);
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
  loadSimilarAdverts$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_LOAD_SIMILAR_ADVERTS),
    switchMap((action: AdvertsLoadSimilarAdverts) => this.adverts.getSimilarAdverts(action.payload)
      .pipe(
        map((response: IServerResponse<IAdvert[]>) => {
          return new AdvertsLoadSimilarAdvertsSuccess(response);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При загрузке похожих объявлений произошла ошибка', 'Закрыть', {
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
  addAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_ADD_AVERT),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectAdvertsOnPage))
    ),
    switchMap(([action, page, advertsOnPage]) => this.adverts.addAdvert((action as AdvertsAddAdvert).payload, page, advertsOnPage)
      .pipe(
        map((response: IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>) => {
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
  addAdvertSuccess$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_ADD_ADVERT_SUCCESS),
    switchMap(() => {
      this.dialog.getDialogById('add-advert-dialog').close(true);
      return EMPTY;
    })
  );

  @Effect()
  editAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_EDIT_ADVERT),
    withLatestFrom(
      this.store.pipe(select(selectPage)),
      this.store.pipe(select(selectAdvertsOnPage))
    ),
    switchMap(([action, page, advertsOnPage]) => this.adverts.editAdvert((action as AdvertsEditAdvert).payload, page, advertsOnPage)
      .pipe(
        map((response: IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>) => {
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
  editAdvertSuccess$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_EDIT_ADVERT_SUCCESS),
    switchMap(() => {
      console.log('edit advert success effect');
      this.dialog.getDialogById('add-advert-dialog').close(true);
      return EMPTY;
    })
  );

  @Effect()
  removeAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_DELETE_ADVERT),
    withLatestFrom(
      this.store.pipe(select(selectNewAdvert)),
    ),
    switchMap(([action, newAdvert]) => this.adverts.removeAdvert((action as AdvertsDeleteAdvert).payload)
      .pipe(
        map(() => {
          if ((action as AdvertsDeleteAdvert).payload.id !== newAdvert.id) {
            this.dialog.getDialogById('removeRoute-advert-dialog').close();
            this.router.navigate(['adverts']);
            this.snackBar.open('Объявление удалено', 'Закрыть', {
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              duration: 3000
            });
          }
          return new AdvertsDeleteAdvertSuccess((action as AdvertsDeleteAdvert).payload);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При удалении объявления произошла ошибка', 'Закрыть', {
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
    withLatestFrom(
      this.store.pipe(select(selectNewAdvert)),
    ),
    switchMap(([action, newAdvert]) => {
      return from(
        this.adverts.uploadImage(
          (action as AdvertsUploadImageToNewAdvert).payload.file,
          0,
          (action as AdvertsUploadImageToNewAdvert).payload.header
        )
      ).pipe(
          map((response: IServerResponse<{url: string, advert: IAdvert}>) => {
            response.data.advert.title = newAdvert.title;
            response.data.advert.preview = newAdvert.preview;
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
        );
    })
  );

  @Effect()
  uploadImageToAdvert$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_ADVERT),
    withLatestFrom(
      this.store.pipe(select(selectNewAdvert))
    ),
    switchMap(([action, advert]) =>
      from(this.adverts.uploadImage(
        (action as AdvertsUploadImageToAdvert).payload.file,
        (advert as Advert).id, (action as AdvertsUploadImageToAdvert).payload.header)
      )
      .pipe(
        map((response: IServerResponse<string>) => {
          return new AdvertsUploadImageToAdvertSuccess(response);
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
    withLatestFrom(
      this.store.pipe(select(selectNewAdvert))
    ),
    switchMap(([action, newAdvert]) => this.adverts.uploadAttachment((action as AdvertsUploadImageToNewAdvert).payload[0])
      .pipe(
        map((response: IServerResponse<IAdvert>) => {
          response.data.title = newAdvert.title;
          response.data.preview = newAdvert.preview;
          response.data.image = newAdvert.image;
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

  @Effect()
  removeAttachment$ = this.actions$.pipe(
    ofType(AdvertsActionTypes.ADVERTS_DELETE_ATTACHMENT),
    withLatestFrom(this.store.pipe(select(selectSelectedAdvert))),
    switchMap(([action, selectedAdvert]) => this.adverts.removeAttachment((action as AdvertsDeleteAttachment).payload)
      .pipe(
        map(() => {
          this.snackBar.open('Вложение удалено', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return selectedAdvert ?
            new AdvertsDeleteAttachmentSuccess((action as AdvertsDeleteAttachment).payload) :
            new AdvertsDeleteAttachmentFromNewAdvertSuccess((action as AdvertsDeleteAttachment).payload);
        }),
        catchError((error: any) => {
          console.error('error occurred: ', error);
          this.snackBar.open('При удалении вложения произошла ошибка', 'Закрыть', {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });
          return EMPTY;
        })
      ))
  );
}
