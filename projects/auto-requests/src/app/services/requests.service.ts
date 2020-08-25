import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IRequest, IRoutePoint } from '../interfaces';
import { Request } from '../models';
import { RequestsResource } from '../resources/requests.resource';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly resource: RequestsResource) {}

  /**
   * Загрузка заявок с сервера
   * @param date - Дата
   * @param statusId - Идентификатор статуса заявки
   * @param transportId - Идентификатор транспорта
   * @param driverId - Идентификатор водителя
   * @param userId - Идентификатор пользователя
   * @param search - Условие поиска
   */
  get(
    date: string,
    statusId: number,
    transportId: number,
    driverId: number,
    userId: number,
    search?: string
  ): Observable<IServerResponse<IRequest[]>> {
    return from(this.resource.get(null, {date, statusId, transportId, driverId, userId, search}, null))
      .pipe(
        map((response: IServerResponse<IRequest[]>) => response)
      );
  }

  /**
   * Добавление завяки
   * @param request - Добавляемая заявка
   */
  add(request: Request): Observable<IServerResponse<{
    requests: IRequest[],
    userRequests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>> {
    return from(this.resource.add(request))
      .pipe(
        map((response: IServerResponse<{
          requests: IRequest[],
          userRequests: IRequest[],
          calendarRequests: {date: string, count: number}[],
          routes: IRoutePoint[]
        }>) => response)
      );
  }
}
