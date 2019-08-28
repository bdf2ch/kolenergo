import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { IPressReport } from '../interfaces';
import { PressReport } from '../models';
import { PressReportsResource } from '../resources/press-reports.resource';

@Injectable({
  providedIn: 'root'
})
export class PressReportsService {

  constructor(private readonly resource: PressReportsResource) {}

  /**
   * Получение отчетов о публикациях в СМИ за указанную дату
   * @param date - Дата
   */
  getReportsByDate(date: string): Observable<IServerResponse<IPressReport[]>> {
    return from(this.resource.getReportsByDate(null, {date}, null))
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          return response;
        })
      );
  }

  /**
   * Добавление отчетов о публикациях в СМИ
   * @param reports - Добавляемые отчеты
   */
  addReports(reports: PressReport[]): Observable<IServerResponse<IPressReport[]>> {
    return from(this.resource.addReports(reports))
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          return response;
        })
      );
  }

  /**
   * Изменение отчетов о публикациях в СМИ
   * @param reports - Изменяемые отчеты
   */
  editReport(reports: PressReport[]): Observable<IServerResponse<IPressReport[]>> {
    return from(this.resource.editReports(reports))
      .pipe(
        map((response: IServerResponse<IPressReport[]>) => {
          return response;
        })
      );
  }

  /**
   * Удаление отчетов о публикациях в СМИ за указанную дату
   * @param date - Дата
   */
  deleteReportsByDate(date: string): Observable<IServerResponse<boolean>> {
    return from(this.resource.deleteReportsByDate(null, {date}, null))
      .pipe(
        map((response: IServerResponse<boolean>) => {
          return response;
        })
      );
  }
}
