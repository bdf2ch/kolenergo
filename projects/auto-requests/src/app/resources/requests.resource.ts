import { Injectable } from '@angular/core';

import {
  IResourceMethod, IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { IRequest, IRoutePoint } from '../interfaces';
import { Request } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/auto-mrsk/requests',
  withCredentials: true
})
export class RequestsResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  get: IResourceMethodStrict<void, {
    date: string,
    statusId: number,
    transportId: number,
    driverId: number,
    userId: number,
    search?: string
  }, void, IServerResponse<IRequest[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  add: IResourceMethod<Request, IServerResponse<{
    requests: IRequest[],
    userRequests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>>;
}
