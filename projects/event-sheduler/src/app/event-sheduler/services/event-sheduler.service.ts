import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IEventRequest, IEventShedulerInitialData } from '../interfaces';
import { EventShedulerResource } from '../resources/event-sheduler.resource';
import { ECalendarModes } from '../enums';
import { EventRequest } from '../models';


@Injectable({
  providedIn: 'root'
})
export class EventShedulerService {

  constructor(private resource: EventShedulerResource) { }

  /**
   * Получение данных для инициализации приложения
   */
  fetchInitialData(userId: number, mode: ECalendarModes): Observable<IServerResponse<IEventShedulerInitialData>> {
    return from(this.resource.getInitialData({userId, mode}))
      .pipe(
        map((response: IServerResponse<IEventShedulerInitialData>) => response)
      );
  }

  /**
   * Добавление заявки на мероприятие
   * @param request - Добавляемая заявка
   */
  addRequest(request: EventRequest): Observable<IServerResponse<IEventRequest>> {
    return from(this.resource.addRequest({request}))
      .pipe(
        map((response: IServerResponse<IEventRequest>) => response)
      );
  }
}
