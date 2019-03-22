import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import  {map } from 'rxjs/operators';

import { AhoRequestsResource } from '../resources/aho-requests.resource';
import { IAhoRequestsInitialData } from '../interfaces';
import { IServerResponse } from 'kolenergo-core';

@Injectable({
  providedIn: 'root'
})
export class AhoRequestsService {

  constructor(private readonly resource: AhoRequestsResource) {}

  fetchInitialData(): Observable<IServerResponse<IAhoRequestsInitialData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IAhoRequestsInitialData>) => response)
      );
  }
}
