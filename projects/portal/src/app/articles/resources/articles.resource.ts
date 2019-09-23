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
import { IArticle } from '../interfaces';
import { Article } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/portal',
  withCredentials: true
})
export class ArticlesResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/articles',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getArticles: IResourceMethodStrict<void, {page?: number, articlesOnPage?: number, search?: string}, void, IServerResponse<IArticle[]>>;

  @ResourceAction({
    path: '/articles',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addArticle: IResourceMethodStrict<Article, void, void, IServerResponse<IArticle>>;

  @ResourceAction({
    path: '/articles/{!id}',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getArticle: IResourceMethodStrict<void, void, {id: number}, IServerResponse<IArticle>>;

  @ResourceAction({
    path: '/articles/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editArticle: IResourceMethodStrict<Article, void, void, IServerResponse<IArticle>>;

  @ResourceAction({
    path: '/articles/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteArticle: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;

  @ResourceAction({
    path: '/articles/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToNewArticle: IResourceMethodStrict<FormData, {header: boolean}, void, IServerResponse<{url: string, article: IArticle}>>;

  @ResourceAction({
    path: '/articles/{!id}/image',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadImageToArticle: IResourceMethodStrict<FormData, {header: boolean}, {id: number}, IServerResponse<string>>;

  @ResourceAction({
    path: '/articles/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToNewArticle: IResourceMethodStrict<FormData, {userId: number}, void, IServerResponse<IArticle>>;

  @ResourceAction({
    path: '/articles/{!id}/attachments',
    method: ResourceRequestMethod.Put,
    withCredentials: true
  })
  uploadAttachmentToArticle: IResourceMethodStrict<FormData, {userId: number}, {id: number}, IServerResponse<IArticle>>;

  @ResourceAction({
    path: '/articles/attachments/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  removeAttachment: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;
}
