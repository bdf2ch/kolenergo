import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import  {map } from 'rxjs/operators';

import { AhoRequestsResource } from '../resources/aho-requests.resource';
import {IAhoRequest, IAhoRequestsInitialData} from '../interfaces';
import { IServerResponse } from 'kolenergo-core';

@Injectable({
  providedIn: 'root'
})
export class AhoRequestsService {

  constructor(private readonly resource: AhoRequestsResource) {}

  fetchInitialData(): Observable<IServerResponse<IAhoRequestsInitialData>> {
    return from(this.resource.getInitialData({userId: 7, itemsOnPage: 20}))
      .pipe(
        map((response: IServerResponse<IAhoRequestsInitialData>) => response)
      );
  }

  fetchRequests(
    start: number,
    end: number,
    userId: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number,
    onlyExpired: boolean,
    page: number,
    itemsOnPage: number,
    search?: string
  ): Observable<IServerResponse<{requests: IAhoRequest[], totalRequests: number}>> {
    return from(this.resource.getRequests(
      null,
      { start, end, userId, employeeId, requestTypeId, requestStatusId, onlyExpired, page, itemsOnPage},
      null
    ))
      .pipe(
        map((response: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) => response)
      );
  }
}
