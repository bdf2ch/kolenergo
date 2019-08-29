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
import { IPressReport } from '../interfaces';
import { PressReport } from '../models';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/reports',
  withCredentials: true
})
export class PressReportsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getReportsByDate: IResourceMethodStrict<void, {date: string}, void, IServerResponse<IPressReport[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addReports: IResourceMethod<PressReport[], IServerResponse<IPressReport[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editReports: IResourceMethod<PressReport[], IServerResponse<IPressReport[]>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteReportsByDate: IResourceMethodStrict<void, {date: string}, void, IServerResponse<boolean>>;
}
