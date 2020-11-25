import { Injectable } from '@angular/core';

import {
  IResourceMethodStrict,
  Resource,
  ResourceAction,
  ResourceHandler,
  ResourceParams,
  ResourceRequestMethod,
  ResourceResponseBodyType
} from '@ngx-resource/core';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
@ResourceParams({
  pathPrefix: environment.apiUrl + '/auto-mrsk/reports',
  withCredentials: true
})
export class ReportsResource extends Resource {
  constructor(handler: ResourceHandler) {
    super(handler);
  }

  @ResourceAction({
    path: '/transport',
    method: ResourceRequestMethod.Get,
    responseBodyType: ResourceResponseBodyType.Blob,
    withCredentials: true
  })
  loadTransportReport: IResourceMethodStrict<void, {
    periodStart: number,
    periodEnd: number,
    transportId: number,
  }, void, Blob>;

  @ResourceAction({
    path: '/driver',
    method: ResourceRequestMethod.Get,
    responseBodyType: ResourceResponseBodyType.Blob,
    withCredentials: true
  })
  loadDriverReport: IResourceMethodStrict<void, {
    periodStart: number,
    periodEnd: number,
    driverId: number,
  }, void, Blob>;
}
