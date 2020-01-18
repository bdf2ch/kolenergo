import { Injectable } from '@angular/core';

import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { IAutoRequestsInitialData } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/auto',
  withCredentials: true
})
export class ApplicationResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData:
    IResourceMethod<{startTime: number, endTime: number, departmentId: number, userId: number}, IServerResponse<IAutoRequestsInitialData>>;
}
