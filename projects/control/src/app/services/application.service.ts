import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IInitialData } from '../interfaces';
import { ApplicationResource } from '../resources/application.resource';



@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private readonly resource: ApplicationResource) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  init(): Observable<IServerResponse<IInitialData>> {
    return from(this.resource.init()).pipe(
      map((response: IServerResponse<IInitialData>) => response)
    );
  }
}
