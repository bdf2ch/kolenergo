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
import { IPortalInitialData } from '../interfaces';
import { IAdvert } from '../../adverts/interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/portal',
  withCredentials: true
})
export class PortalResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<{advertsOnPage: number, articlesOnPage: number}, IServerResponse<IPortalInitialData>>;

  @ResourceAction({
    path: '/adverts',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAdvertsPage: IResourceMethod<{page: number, advertsOnPage: number}, IServerResponse<IAdvert[]>>;

  /*
  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  init: IResourceMethod<{userId: number, itemsOnPage: number}, IServerResponse<IAhoRequestsInitialData2>>;

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
