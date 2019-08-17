import { Action } from '@ngrx/store';

import { IServerResponse } from 'kolenergo-core/lib/interfaces';
import { IAdvert } from '../interfaces';
import { Advert } from '../models';

/**
 * Типы действий в приложении
 */
export enum AdvertsActionTypes {
  LOAD_ADVERTS = '[Portal API] Load list of adverts',
  LOAD_ADVERTS_SUCCESS = '[Portal API] List of adverts loaded successfully',
  ADD_AVERT = '[Portal API] Add new advert',
  ADD_ADVERT_SUCCESS = '[Portal API] Advert added successfully',
  UPLOAD_IMAGE_TO_NEW_ADVERT = '[Portal API] Upload image to new advert',
  UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS = '[Portal API] Image to new advert uploaded successfully',
  EDIT_ADVERT = '[Portal API] Save advert changes',
  EDIT_ADVERT_SUCCESS = '[Portal API] Advert changes saved successfully'
}

/**
 * Загрузка списка объявлений
 */
export class LoadAdverts implements Action {
  readonly type = AdvertsActionTypes.LOAD_ADVERTS;
}

/**
 * Загрузка списка объявлений выполнена успешно
 */
export class LoadAdvertsSuccess implements Action {
  readonly type = AdvertsActionTypes.LOAD_ADVERTS_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

/**
 * Добавление нового объявления
 */
export class AddAdvert implements Action {
  readonly type = AdvertsActionTypes.ADD_AVERT;
  constructor(public payload: Advert) {}
}

/**
 * Добавление новго объявления выполнено успешно
 */
export class AddAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADD_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Загрузка изображения в новое объявление
 */
export class UploadImageToNewAdvert implements Action {
  readonly type = AdvertsActionTypes.UPLOAD_IMAGE_TO_NEW_ADVERT;
}

/**
 * Загрузка изображения в новое объявление выполнена успешно
 */
export class UploadImageToNewAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<{url: string, advert: IAdvert}>) {}
}

/**
 * Сохраннеие изменений в объявлении
 */
export class EditAdvert implements Action {
  readonly type = AdvertsActionTypes.EDIT_ADVERT;
  constructor(public payload: Advert) {}
}

/**
 * Сохранение изменений в объявлении выполенно успешно
 */
export class EditAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.EDIT_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

export type advertsActions =
  LoadAdverts |
  LoadAdvertsSuccess |
  AddAdvert |
  AddAdvertSuccess |
  UploadImageToNewAdvert |
  UploadImageToNewAdvertSuccess |
  EditAdvert |
  EditAdvertSuccess;
