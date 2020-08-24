import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { IInitialData } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private readonly resource: ApplicationResource) {}

  /**
   * Получение с сервера данных для инициализации приложения
   */
  init(): Observable<IServerResponse<IInitialData>> {
    return from(this.resource.init(null, null))
      .pipe(
        map((response: IServerResponse<IInitialData>) => response)
      );
  }
}
