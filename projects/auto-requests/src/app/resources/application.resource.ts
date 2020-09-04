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
import { IInitialData } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/auto-mrsk',
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
  init: IResourceMethodStrict<void, {appCode: string}, void, IServerResponse<IInitialData>>;
}
