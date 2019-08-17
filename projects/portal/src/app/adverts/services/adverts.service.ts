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
    return from(this.resource.getAdvertsPage({page, advertsOnPage})).pipe(
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

  uploadImage(image: File, advertId?: number): Promise<IServerResponse<{url: string, advert: IAdvert}|string>> {
    const data = new FormData();
    data.append('image', image);
    if (advertId) {
      return this.resource.uploadImageToAdvert(data, null, {id: advertId});
    } else {
      return this.resource.uploadImageToNewAdvert(data);
    }
  }

  uploadAttachment(file: File, advertId?: number): Promise<IServerResponse<{attachment: IAttachment, advert: IAdvert}|IAttachment>> {
    const data = new FormData();
    data.append('file', file);
    if (advertId) {
      return this.resource.uploadAttachmentToAdvert(data, null, {id: advertId});
    } else {
      return this.resource.uploadAttachmentToNewAdvert(data, {userId: 7});
    }
  }
}
