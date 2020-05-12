import { Injectable } from '@angular/core';

import {
  IResourceMethod,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod,
} from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/osr2/consumption'
})
export class ConsumptionResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  add: IResourceMethod<{companyId: number, divisionId: number, consumption: number}, IServerResponse<number>>;
}
