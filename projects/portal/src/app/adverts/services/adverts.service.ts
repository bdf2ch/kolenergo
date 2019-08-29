import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IAdvert } from '../interfaces';
import { AdvertsResource } from '../resources/adverts.resource';
import { Advert } from '../models';
import {IAttachment} from '../../portal/interfaces';



@Injectable({
  providedIn: 'root'
})
export class AdvertsService {

  constructor(private readonly resource: AdvertsResource) {}

  /**
   * Загрузка страницы объявлений с сервера
   * @param page - Порядковый номер страницы
   * @param itemsOnPage - Количество объявлений на старнице
   */
  getAdvertsPage(page: number, advertsOnPage: number): Observable<IServerResponse<IAdvert[]>> {
    return from(this.resource.getAdverts(null, {page, advertsOnPage}, null)).pipe(
      map((response: IServerResponse<IAdvert[]>) => response)
    );
  }

  /**
   * Добавление объявления
   * @param advert - Добавляемое объявление
   */
  addAdvert(advert: Advert): Observable<IServerResponse<IAdvert>> {
    return from(this.resource.addAdvert(advert)).pipe(
      map((response: IServerResponse<IAdvert>) => response)
    );
  }

  /**
   * Изменение объявления
   * @param advert - Изменяемое объявление
   */
  editAdvert(advert: Advert): Observable<IServerResponse<IAdvert>> {
    return from(this.resource.editAdvert(advert)).pipe(
      map((response: IServerResponse<IAdvert>) => {
        return response;
      })
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

  uploadImage(image: File, advertId?: number): Promise<IServerResponse<{url: string, advert: IAdvert}|string>> {
    const data = new FormData();
    data.append('image', image);
    if (advertId) {
      return this.resource.uploadImageToAdvert(data, null, {id: advertId});
    } else {
      return this.resource.uploadImageToNewAdvert(data);
    }
  }

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
}
