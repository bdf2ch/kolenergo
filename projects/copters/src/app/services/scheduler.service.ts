import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { SchedulerResource } from '../resources/scheduler.resource';
import { IInitialData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {

  constructor(private resource: SchedulerResource) { }

  /**
   * Инициализация приложения
   */
  init(): Observable<IServerResponse<IInitialData>> {
    return from(this.resource.init()).pipe(
      map((response: IServerResponse<IInitialData>) => response)
    );
  }
}
