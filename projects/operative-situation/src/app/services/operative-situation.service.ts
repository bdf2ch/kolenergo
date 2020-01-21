import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { OperativeSituationResource } from '../resources/reports.resource';
import { IAppInitData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class OperativeSituationService {
  constructor(private readonly resource: OperativeSituationResource) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  getInitialData(): Observable<IServerResponse<IAppInitData>> {
    return from(this.resource.getInitialData(null, null, null))
      .pipe(
        map((response: IServerResponse<IAppInitData>) => response)
      );
  }
}
