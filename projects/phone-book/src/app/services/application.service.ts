import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IInitialData } from '../interfaces';
import { ApplicationResource } from '../resources/application.resource';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private readonly resource: ApplicationResource) {}

  getInitialData(): Observable<IServerResponse<IInitialData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IInitialData>) => response)
      );
  }

  searchContacts(search: string): Observable<IServerResponse<any>> {
    return from(this.resource.searchContacts(null, {search}, null))
      .pipe(
        map((response: IServerResponse<any>) => response)
      );
  }
}
