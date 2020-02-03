import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { OperativeSituationResource } from '../resources/reports.resource';
import {IAppInitData, IReport, IReportSummary} from '../interfaces';
import {Report} from '../models';

@Injectable({
  providedIn: 'root'
})
export class OperativeSituationService {
  constructor(private readonly resource: OperativeSituationResource) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  getInitialData(): Observable<IServerResponse<IAppInitData>> {
    return from(this.resource.getInitialData(null, null, null))
      .pipe(
        map((response: IServerResponse<IAppInitData>) => response)
      );
  }

  /**
   * Загрузка отчетов по оргинизации/структурному подразделению
   * @param companyId - Идентификатор организации
   * @param divisionId - Идентификатор структурного подразделения
   */
  getReports(companyId: number = 0, divisionId: number = 0): Observable<IServerResponse<IReportSummary>> {
    return from(this.resource.getReports(null, {companyId, divisionId}, null))
      .pipe(
        map((response: IServerResponse<IReportSummary>) => response)
      );
  }

  /**
   * Добавление отчета об оперативной обстановке
   * @param report - Добавляемый отчет об оперативной обстановке
   */
  addReport(report: Report): Observable<IServerResponse<IReportSummary>> {
    return from(this.resource.addReport(report, null, null))
      .pipe(
        map((response: IServerResponse<IReportSummary>) => response)
      );
  }
}
