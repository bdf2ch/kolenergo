import { Action } from '@ngrx/store';

import { IServerResponse } from 'kolenergo-core/lib/interfaces';
import { IAdvert } from '../interfaces';
import { Advert } from '../models';

/**
 * Типы действий в приложении
 */
export enum AdvertsActionTypes {
  ADVERTS_LOAD_ADVERTS = '[Adverts page] Load list of adverts',
  ADVERTS_LOAD_ADVERTS_SUCCESS = '[Adverts page] List of adverts loaded successfully',
  ADVERTS_LOAD_ADVERTS_NEXT_PAGE = '[Adverts page] Load next page of adverts',
  ADVERTS_LOAD_ADVERTS_NEXT_PAGE_SUCCESS = '[Adverts page] Next page of adverts loaded successfully',
  ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT = '[Adverts API] Upload image to new advert',
  ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS = '[Adverts API] Image to new advert uploaded successfully',
  ADVERTS_UPLOAD_IMAGE_TO_ADVERT = '[Adverts API] Upload image to advert',
  ADVERTS_UPLOAD_IMAGE_TO_ADVERT_SUCCESS = '[Adverts API] Image to advert uploaded successfully',
  ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT = '[Adverts API] Upload attachment to new advert',
  ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT_SUCCESS = '[Adverts API] Attachment to new advert uploaded successfully',
  ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT = '[Adverts API] Upload attachment to advert',
  ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT_SUCCESS = '[Adverts API] Attachment to advert uploaded successfully',
  ADVERTS_ADD_AVERT = '[Adverts API] Add new advert',
  ADVERTS_ADD_ADVERT_SUCCESS = '[Adverts API] Advert added successfully',
  ADVERTS_EDIT_ADVERT = '[Adverts API] Save advert changes',
  ADVERTS_EDIT_ADVERT_SUCCESS = '[Adverts API] Advert changes saved successfully',
  ADVERTS_SEARCH_ADVERTS = '[Adverts API] Search adverts',
  ADVERTS_SEARCH_ADVERTS_SUCCESS = '[Adverts API] Adverts search completed',
  ADVERTS_CLEAR_SEARCH = '[Adverts page] Clear adverts search'
}

/**
 * Загрузка списка объявлений
 */
export class AdvertsLoadAdverts implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_LOAD_ADVERTS;
}

/**
 * Загрузка списка объявлений выполнена успешно
 */
export class AdvertsLoadAdvertsSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

/**
 * Загрузка следующей страницы с объявлениями
 */
export class AdvertsLoadAdvertsNextPage implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_NEXT_PAGE;
}

/**
 * Загрузка следующей страницы с объявлениями выполенна успешно
 */
export class AdvertsLoadAdvertsNextPageSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_LOAD_ADVERTS_NEXT_PAGE_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

/**
 * Добавление нового объявления
 */
export class AdvertsAddAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_ADD_AVERT;
  constructor(public payload: Advert) {}
}

/**
 * Добавление новго объявления выполнено успешно
 */
export class AdvertsAddAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_ADD_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Загрузка изображения в новое объявление
 */
export class AdvertsUploadImageToNewAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT;
  constructor(public payload: {file: File, header: boolean}) {}
}

/**
 * Загрузка изображения в новое объявление выполнена успешно
 */
export class AdvertsUploadImageToNewAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_NEW_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<{url: string, advert: IAdvert}>) {}
}

export class AdvertsUploadImageToAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_ADVERT;
  constructor(public payload: {file: File, header: boolean}) {}
}

export class AdvertsUploadImageToAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_IMAGE_TO_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Загрузка вложения в новое объявление
 */
export class AdvertsUploadAttachmentToNewAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT;
  constructor(public payload: FileList) {}
}

/**
 * Загрузка вложения в новое объяволение выполнена успешно
 */
export class AdvertsUploadAttachmentToNewAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_NEW_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Загрузка вложения в объявление
 */
export class AdvertsUploadAttachmentToAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT;
  constructor(public payload: FileList) {}
}

/**
 * Загрузка вложения в объявление выполнена успешно
 */
export class AdvertsUploadAttachmentToAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_UPLOAD_ATTACHMENT_TO_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Сохраннеие изменений в объявлении
 */
export class AdvertsEditAdvert implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_EDIT_ADVERT;
  constructor(public payload: Advert) {}
}

/**
 * Сохранение изменений в объявлении выполенно успешно
 */
export class AdvertsEditAdvertSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_EDIT_ADVERT_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert>) {}
}

/**
 * Поиск заявок
 */
export class AdvertsSearchAdverts implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_SEARCH_ADVERTS;
  constructor(public payload: string) {}
}

/**
 * Поиск заявок выполнен успешно
 */
export class AdvertsSearchAdvertsSuccess implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_SEARCH_ADVERTS_SUCCESS;
  constructor(public payload: IServerResponse<IAdvert[]>) {}
}

/**
 * Очистка результатов поиска
 */
export class AdvertsClearSearch implements Action {
  readonly type = AdvertsActionTypes.ADVERTS_CLEAR_SEARCH;
}

export type advertsActions =
  AdvertsLoadAdverts |
  AdvertsLoadAdvertsSuccess |
  AdvertsLoadAdvertsNextPage |
  AdvertsLoadAdvertsNextPageSuccess |
  AdvertsAddAdvert |
  AdvertsAddAdvertSuccess |
  AdvertsUploadImageToNewAdvert |
  AdvertsUploadImageToNewAdvertSuccess |
  AdvertsUploadImageToAdvert |
  AdvertsUploadAttachmentToAdvertSuccess |
  AdvertsUploadAttachmentToNewAdvert |
  AdvertsUploadAttachmentToNewAdvertSuccess |
  AdvertsUploadAttachmentToAdvert |
  AdvertsUploadAttachmentToAdvertSuccess |
  AdvertsEditAdvert |
  AdvertsEditAdvertSuccess |
  AdvertsSearchAdverts |
  AdvertsSearchAdvertsSuccess |
  AdvertsClearSearch;
