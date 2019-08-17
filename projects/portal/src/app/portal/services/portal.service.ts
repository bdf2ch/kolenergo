import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IPortalInitialData } from '../interfaces';
import { IAdvert } from '../../adverts/interfaces';
import { PortalResource } from '../resources/portal.resource';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PortalService {

  constructor(private readonly resource: PortalResource) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  getInitialData(): Observable<IServerResponse<IPortalInitialData>> {
    return from(this.resource.getInitialData({advertsOnPage: environment.advertsOnPage})).pipe(
      map((response: IServerResponse<IPortalInitialData>) => response)
    );
  }

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
}
