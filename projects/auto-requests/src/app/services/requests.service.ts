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
   * @param periodStart - Начало периода
   * @param periodEnd - Окончание периода
   * @param statusId - Идентификатор статуса заявки
   * @param transportId - Идентификатор транспорта
   * @param driverId - Идентификатор водителя
   * @param userId - Идентификатор пользователя
   * @param search - Условие поиска
   */
  get(
    periodStart: number,
    periodEnd: number,
    statusId: number,
    transportId: number,
    driverId: number,
    userId: number,
    search?: string
  ): Observable<IServerResponse<IRequest[]>> {
    return from(this.resource.get(null, {periodStart, periodEnd, statusId, transportId, driverId, userId, search}, null))
      .pipe(
        map((response: IServerResponse<IRequest[]>) => response)
      );
  }

  /**
   * Загрузка оповещений для календаря о заявках со статусом "Не подтверждена"
   * @param start - Дата и время начала периода в формате Unix
   * @param end - Дата и время окончания периода в формате Unix
   */
  getNotifications(
    start: number,
    end: number
  ): Observable<IServerResponse<{date: string, count: number}[]>> {
    return from(this.resource.getNotifications(null, {start, end}, null))
      .pipe(
        map((response: IServerResponse<{date: string, count: number}[]>) => response)
      );
  }

  /**
   * Добавление заявки
   * @param request - Добавляемая заявка
   * @param date - Текущая дата
   * @param periodStart - Дата и время начала периолда календаря в формате Unix
   * @param periodEnd - Дата и время окончания периода календаря в формате Unix
   */
  add(
    request: Request,
    date: Date,
    periodStart: number,
    periodEnd: number
  ): Observable<IServerResponse<{
    requests: IRequest[],
    userRequests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>> {
    return from(this.resource.add(request, {date, periodStart, periodEnd}, null))
      .pipe(
        map((response: IServerResponse<{
          requests: IRequest[],
          userRequests: IRequest[],
          calendarRequests: {date: string, count: number}[],
          routes: IRoutePoint[]
        }>) => response)
      );
  }

  /**
   * Сохранение изменений в заявке
   * @param request - Изменяемая заявка
   * @param periodStart - Дата и время начала периода календаря в формате Unix
   * @param periodEnd - Дата и времяч окончания периода календаря в формате Unix
   * @param currentDate - Текущая дата
   */
  edit(
    request: Request,
    periodStart: number,
    periodEnd: number,
    currentDate: Date
  ): Observable<IServerResponse<{requests: IRequest[], calendarRequests: {date: string, count: number}[], routes: IRoutePoint[]}>> {
    return from(this.resource.edit(request, {periodStart, periodEnd, currentDate}, {id: request.id}))
      .pipe(
        map((response: IServerResponse<{
          requests: IRequest[],
          calendarRequests: {date: string, count: number}[],
          routes: IRoutePoint[]
        }>) => response)
      );
  }

  /**
   * Отмена заявки
   * @param requestId - Идентификатор заявки
   */
  cancel(requestId: number): Observable<IServerResponse<IRequest>> {
    return from(this.resource.cancel(null, null, {id: requestId}))
      .pipe(
        map((response: IServerResponse<IRequest>) => response)
      );
  }

  /**
   * Экспорт заявок
   * @param periodStart - Начало периода
   * @param periodEnd - Окончание периода
   * @param statusId - Идентификатор статуса заявки
   * @param transportId - Идентификатор транспорта
   * @param driverId - Идентификатор водителя
   * @param userId - Идентификатор пользователя
   * @param search - Условие поиска
   */
  export(
    periodStart: number,
    periodEnd: number,
    statusId: number,
    transportId: number,
    driverId: number,
    userId: number,
    search?: string
  ): Observable<Blob> {
    return from(this.resource.export(null, {periodStart, periodEnd, statusId, transportId, driverId, userId, search}, null))
      .pipe(
        map((response: Blob) => response)
      );
  }

  /**
   * Получение информации о задействованном транспорте и водителях по времени поездки
   * @param requestId - Идентификатор заявки
   * @param startTime - Время начала
   * @param endTime - Время окончания
   */
  getBusy(
    requestId: number,
    startTime: number,
    endTime: number
  ): Observable<IServerResponse<{transport: number[], drivers: number[]}>> {
    return from(this.resource.getBusy(null, {requestId, startTime, endTime}, null))
      .pipe(
        map((response: IServerResponse<{transport: number[], drivers: number[]}>) => response)
      );
  }
}
