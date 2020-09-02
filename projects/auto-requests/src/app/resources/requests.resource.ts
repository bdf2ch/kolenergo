import { Injectable } from '@angular/core';

import {
  IResourceMethod,
  IResourceMethodStrict,
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
    // date: string,
    periodStart: number,
    periodEnd: number,
    statusId: number,
    transportId: number,
    driverId: number,
    userId: number,
    search?: string
  }, void, IServerResponse<IRequest[]>>;

  @ResourceAction({
    path: '/calendar',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getNotifications: IResourceMethodStrict<void, { start: number, end: number}, void, IServerResponse<{date: string, count: number}[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  add: IResourceMethodStrict<Request, {date: Date, periodStart: number, periodEnd: number}, void, IServerResponse<{
    requests: IRequest[],
    userRequests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>>;

  @ResourceAction({
    path: '/{!:id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  edit: IResourceMethodStrict<Request, {periodStart: number, periodEnd: number, currentDate: Date}, {id: number}, IServerResponse<{
    requests: IRequest[],
    calendarRequests: {date: string, count: number}[],
    routes: IRoutePoint[]
  }>>;
}
