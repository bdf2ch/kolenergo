import { Injectable } from '@angular/core';

import {IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod} from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { environment } from '../../../environments/environment';
import { IEventRequest, IEventShedulerInitialData } from '../interfaces';
import { EventRequest } from '../models';
import { ECalendarModes } from '../enums';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl,
  withCredentials: true
})
export class EventShedulerResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<{userId: number, mode: ECalendarModes}, IServerResponse<IEventShedulerInitialData>>;

  @ResourceAction({
    path: '/request',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addRequest: IResourceMethod<{request: EventRequest}, IServerResponse<IEventRequest>>;
}
