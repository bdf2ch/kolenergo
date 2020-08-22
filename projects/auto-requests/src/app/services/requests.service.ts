import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import {IRequest, IRoutePoint} from '../interfaces';
import { Request } from '../models';
import { RequestsResource } from '../resources/requests.resource';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  constructor(private readonly resource: RequestsResource) {}

  /**
   * Добавление завяки
   * @param request - Добавляемая заявка
   */
  add(request: Request): Observable<IServerResponse<{request: IRequest, routes: IRoutePoint[]}>> {
    return from(this.resource.add(request))
      .pipe(
        map((response: IServerResponse<{request: IRequest, routes: IRoutePoint[]}>) => response)
      );
  }
}
