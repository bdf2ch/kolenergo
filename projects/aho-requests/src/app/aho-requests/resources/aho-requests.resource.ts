import { Injectable } from '@angular/core';

import { IResourceMethod, Resource, ResourceAction, ResourceHandler, ResourceParams, ResourceRequestMethod } from '@ngx-resource/core';

import { IServerResponse } from 'kolenergo-core';
import { IAhoRequestsInitialData } from '../interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + 'aho',
  withCredentials: true
})
export class AhoRequestsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/init',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<void, IServerResponse<IAhoRequestsInitialData>>;
}
