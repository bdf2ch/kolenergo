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
import {IAppInitData, IConsumption, IReport, IReportSummary, IWeatherSummary} from '../interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/osr2'
})
export class OperativeSituationResource extends Resource {

  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getInitialData: IResourceMethodStrict<void, void, void, IServerResponse<IAppInitData>>;

  @ResourceAction({
    path: '/reports',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getReports: IResourceMethod<{companyId?: number, divisionId?: number}, IServerResponse<IReportSummary>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addReport: IResourceMethod<IReport, IServerResponse<IReport>>;

  @ResourceAction({
    path: '/',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editReport: IResourceMethod<IReport, IServerResponse<IReport>>;

  @ResourceAction({
    path: '/{!id}',
    method: ResourceRequestMethod.Delete,
    withCredentials: true
  })
  deleteReport: IResourceMethodStrict<void, void, {id: number}, IServerResponse<boolean>>;

  @ResourceAction({
    path: '/consumption',
    method: ResourceRequestMethod.Post,
    withCredentials: true
  })
  addConsumption: IResourceMethod<IConsumption, IServerResponse<IConsumption>>;

  @ResourceAction({
    path: '/consumption',
    method: ResourceRequestMethod.Patch,
    withCredentials: true
  })
  editConsumption: IResourceMethod<IConsumption, IServerResponse<IConsumption>>;

  @ResourceAction({
    path: '/weatherSummary',
    method: ResourceRequestMethod.Get,
    withCredentials: true
  })
  getWeatherSummary: IResourceMethodStrict<void, {companyId: number}, void, IServerResponse<IWeatherSummary>>;

  @ResourceAction({
    path: '/export',
    method: ResourceRequestMethod.Get,
    withCredentials: true,
    responseBodyType: ResourceResponseBodyType.Blob
  })
  exportReport: IResourceMethodStrict<void, {date: string, period: string}, void, Blob>;
}
