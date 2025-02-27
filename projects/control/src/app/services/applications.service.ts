import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IApplication } from '../interfaces';
import { ApplicationsResource } from '../resources/applications.resource';
import {Application} from '../models';



@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private readonly resource: ApplicationsResource) {}

  /**
   * Загрузка списка приложений с сервера
   */
  getApplications(): Observable<IServerResponse<IApplication[]>> {
    return from(this.resource.getApplications()).pipe(
      map((response: IServerResponse<IApplication[]>) => response)
    );
  }

  /**
   * Добавление приложения
   * @param application - Добавляемое приложение
   */
  add(application: Application): Observable<IServerResponse<IApplication>> {
    return from(this.resource.add(application)).pipe(
      map((response: IServerResponse<IApplication>) => response)
    );
  }
}
