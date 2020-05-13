import { Injectable } from '@angular/core';

import {
  IResourceMethod,
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod,
  ResourceResponseBodyType
} from '@ngx-resource/core';

import { IServerResponse } from '@kolenergo/core';
import { IReport, IReportSummary } from '../interfaces';
import { Report } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/osr2/reports'
})
export class ReportsResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  get: IResourceMethod<{companyId?: number, divisionId?: number}, IServerResponse<IReportSummary>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  add: IResourceMethod<Report, IServerResponse<IReportSummary>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  edit: IResourceMethodStrict<IReport, void, {id: number}, IServerResponse<IReportSummary>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  delete: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;

  @ResourceAction({
    path: '/export',
    method: ResourceRequestMethod.Get,
    withCredentials: true,
    responseBodyType: ResourceResponseBodyType.Blob
  })
  export: IResourceMethodStrict<void, {time: string}, void, Blob>;
}
