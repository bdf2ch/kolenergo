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
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAdvert: IResourceMethodStrict<void, void, {id: number}, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editAdvert: IResourceMethodStrict<Advert, void, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteAdvert: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;

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
    path: '/adverts/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToNewAdvert: IResourceMethodStrict<FormData, {userId: number}, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/{!id}/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToAdvert: IResourceMethodStrict<FormData, {userId: number}, {id: number}, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/adverts/attachments/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  removeAttachment: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;
}
