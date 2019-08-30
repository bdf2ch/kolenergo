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
import { IAdvert } from '../interfaces';
import { environment } from '../../../environments/environment';
import { Advert } from '../models';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/portal',
  withCredentials: true
})
export class AdvertsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/adverts',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAdverts: IResourceMethodStrict<void, {page?: number, advertsOnPage?: number, search?: string}, void, IServerResponse<IAdvert[]>>;

  @ResourceAction({
    path: '/adverts',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addAdvert: IResourceMethodStrict<Advert, void, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editAdvert: IResourceMethodStrict<Advert, void, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToNewAdvert: IResourceMethodStrict<FormData, {header: boolean}, void, IServerResponse<{url: string, advert: IAdvert}>>;

  @ResourceAction({
    path: '/adverts/{!id}/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToAdvert: IResourceMethodStrict<FormData, {header: boolean}, {id: number}, IServerResponse<string>>;

  @ResourceAction({
    path: '/adverts/attachment',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToNewAdvert: IResourceMethodStrict<FormData, {userId: number}, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/{!id}/attachment',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToAdvert: IResourceMethodStrict<FormData, {userId: number}, {id: number}, IServerResponse<IAdvert>>;

  /*
  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethod<{userId: number, itemsOnPage: number}, IServerResponse<IAhoRequestsInitialData2>>;

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
