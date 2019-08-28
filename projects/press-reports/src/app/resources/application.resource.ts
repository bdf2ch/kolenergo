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
import { IApplicationInitialData } from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl,
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
  getInitialData: IResourceMethod<void, IServerResponse<IApplicationInitialData>>;

  /*
  @ResourceAction({
    path: '/requests',
    method: ResourceRequestMethod.Get,
    withCredentials: true,
    queryMappingMethod: ResourceQueryMappingMethod.Plain
  })
  getRequests: IResourceMethodStrict<
    void,
    {
      departmentId: number[],
      start: number,
      end: number,
      userId: number,
      employeeId: number,
      requestTypeId: number,
      requestStatusId: number,
      onlyExpired: boolean,
      page: number,
      itemsOnPage: number
    },
    void,
    IServerResponse<{requests: IAhoRequest[], totalRequests: number}>>;

  @ResourceAction({
    path: '/requests/{!id}',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getRequestById: IResourceMethod<{id: number}, IAhoRequest>;
   */
}
