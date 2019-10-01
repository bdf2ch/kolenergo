import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IAdvert } from '../interfaces';
import { AdvertsResource } from '../resources/adverts.resource';
import { Advert } from '../models';
import {Attachment} from "../../portal/models";



@Injectable({
  providedIn: 'root'
})
export class AdvertsService {

  constructor(private readonly resource: AdvertsResource) {}

  /**
   * Загрузка страницы объявлений с сервера
   * @param page - Порядковый номер страницы
   * @param advertsOnPage - Количество объявлений на старнице
   */
  getAdvertsPage(page: number, advertsOnPage: number): Observable<IServerResponse<IAdvert[]>> {
    return from(this.resource.getAdverts(null, {page, advertsOnPage}, null)).pipe(
      map((response: IServerResponse<IAdvert[]>) => response)
    );
  }

  /**
   * Загрузка объявления с сервера
   * @param advertId - Идентификатор объявления
   */
  getAdvert(advertId: number): Observable<IServerResponse<IAdvert>> {
    return from(this.resource.getAdvert(null, null, {id: advertId})).pipe(
      map((response: IServerResponse<IAdvert>) => response)
    );
  }

  /**
   * Загрузка похожих объявлений
   * @param advert - Объявление, на основе которого ищутся похожие
   */
  getSimilarAdverts(advert): Observable<IServerResponse<IAdvert[]>> {
    return from(this.resource.getAdvert(null, {similar: true}, {id: advert.id}))
      .pipe(
        map((response: IServerResponse<IAdvert[]>) => response)
      );
  }

  /**
   * Добавление объявления
   * @param advert - Добавляемое объявление
   * @param currentPage - Текущая страница объявлений
   * @param advertsOnPage - Количество объявлений на странице
   */
  addAdvert(
    advert: Advert,
    currentPage: number,
    advertsOnPage: number
  ): Observable<IServerResponse<{adverts: IAdvert[], advert: IAdvert}>> {
    return from(this.resource.addAdvert(advert, {page: currentPage, advertsOnPage})).pipe(
      map((response: IServerResponse<{adverts: IAdvert[], advert: IAdvert}>) => response)
    );
  }

  /**
   * Изменение объявления
   * @param advert - Изменяемое объявление
   * @param currentPage - Текущая страница объявлений
   * @param advertsOnPage - Количество объявлений на странице
   */
  editAdvert(
    advert: Advert,
    currentPage: number,
    advertsOnPage: number
  ): Observable<IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>> {
    return from(this.resource.editAdvert(advert, {page: currentPage, advertsOnPage})).pipe(
      map((response: IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>) => {
        return response;
      })
    );
  }

  /**
   * Удаление объявления
   * @param advert - Удаляемое объявление
   */
  removeAdvert(advert: Advert): Observable<IServerResponse<boolean>> {
    return from(this.resource.deleteAdvert(null, null, {id: advert.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => response)
      );
  }

  /**
   * Поиск объявлений
   * @param query - Условие поиска
   */
  searchAdverts(query: string): Observable<IServerResponse<IAdvert[]>> {
    return from(this.resource.getAdverts(null, {search: query}, null)).pipe(
      map((response: IServerResponse<IAdvert[]>) => response)
    );
  }

  /**
   * Загрузка изображения на сервер
   * @param image - Загружаемое изображение
   * @param advertId - Идентификатор объявления
   * @param header - Загружается ли изображение в тело объявления либо в шапку
   */
  uploadImage(image: File, advertId: number, header: boolean): Promise<IServerResponse<{url: string, advert: IAdvert}|string>> {
    const data = new FormData();
    data.append('image', image);
    if (advertId && advertId !== 0) {
      return this.resource.uploadImageToAdvert(data, {header}, {id: advertId});
    } else {
      return this.resource.uploadImageToNewAdvert(data, {header}, null);
    }
  }

  /**
   * Загрузка вложения на сервер
   * @param file - Загружаемое вложение
   * @param advertId - Идентфиикатор объявления
   */
  uploadAttachment(file: File, advertId?: number): Observable<IServerResponse<IAdvert>> {
    const data = new FormData();
    data.append('file', file);
    return advertId ?
      from(this.resource.uploadAttachmentToAdvert(data, {userId: 7}, {id: advertId}))
        .pipe(
          map((response: IServerResponse<IAdvert>) => response)
        )
      : from(this.resource.uploadAttachmentToNewAdvert(data, {userId: 7}))
        .pipe(
          map((response: IServerResponse<IAdvert>) => response)
        );
  }

  /**
   * Удаление вложения
   * @param attachment - Удаляемое вложение
   */
  removeAttachment(attachemnt: Attachment): Observable<IServerResponse<boolean>> {
    return from(this.resource.removeAttachment(null, null, {id: attachemnt.id}))
      .pipe(
        map((response: IServerResponse<boolean>) => response)
      );
  }
}
