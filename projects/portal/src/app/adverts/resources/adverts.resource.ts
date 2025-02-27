import { Injectable } from '@angular/core';

import {
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod
} from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { IAdvert } from '../interfaces';
import { Advert } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/portal/adverts',
  withCredentials: true
})
export class AdvertsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAdverts: IResourceMethodStrict<void, {page?: number, advertsOnPage?: number, search?: string}, void, IServerResponse<IAdvert[]>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getAdvert: IResourceMethodStrict<void, {similar?: boolean}, {id: number}, IServerResponse<IAdvert | IAdvert[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addAdvert:
    IResourceMethodStrict<Advert, {page: number, advertsOnPage: number}, void, IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editAdvert: IResourceMethodStrict<Advert, {page: number, advertsOnPage: number}, void, IServerResponse<{adverts: IAdvert[], advert: IAdvert, total: number}>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteAdvert: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;

  @ResourceAction({
    path: '/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToNewAdvert: IResourceMethodStrict<FormData, {header: boolean}, void, IServerResponse<{url: string, advert: IAdvert}>>;

  @ResourceAction({
    path: '/{!id}/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToAdvert: IResourceMethodStrict<FormData, {header: boolean}, {id: number}, IServerResponse<string>>;

  @ResourceAction({
    path: '/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToNewAdvert: IResourceMethodStrict<FormData, {userId: number}, void, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/{!id}/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToAdvert: IResourceMethodStrict<FormData, {userId: number}, {id: number}, IServerResponse<IAdvert>>;

  @ResourceAction({
    path: '/attachments/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  removeAttachment: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;
}
