import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { IAutoRequestsInitialData } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private readonly resource: ApplicationResource) {}

  /**
   * Получение с сервера данных для инициализации приложения
   * @param periodStart - Начало периода
   * @param periodEnd - Окончание периода
   * @param departmentId - Идентификатор подразделения организации
   * @param userId - Идентификатор пользователя
   */
  getInitialData(
    periodStart: number,
    periodEnd: number,
    departmentId: number,
    userId: number
  ): Observable<IServerResponse<IAutoRequestsInitialData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IAutoRequestsInitialData>) => response)
      );
  }
}
