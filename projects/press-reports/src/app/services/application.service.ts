import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { IApplicationInitialData } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private readonly resource: ApplicationResource) {}

  getInitialData(): Observable<IServerResponse<IApplicationInitialData>> {
    return from(this.resource.getInitialData())
      .pipe(
        map((response: IServerResponse<IApplicationInitialData>) => {
          return response;
        })
      );
  }
}
