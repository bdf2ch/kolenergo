import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { IApplicationInitialData } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private readonly application: ApplicationResource) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  getInitialData(): Observable<IServerResponse<IApplicationInitialData>> {
    return from(this.application.getInitialData(null, {messageCount: 1}, null))
      .pipe(
        map((response: IServerResponse<IApplicationInitialData>) => response)
      );
  }
}
