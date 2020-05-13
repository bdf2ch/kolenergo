import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse } from '@kolenergo/core';
import { ApplicationResource } from '../resources/application.resource';
import { ReportsResource } from '../resources/reports.resource';
import { ConsumptionResource } from '../resources/consumption.resource';
import {IAppInitData, IReport, IReportSummary} from '../interfaces';
import { Report} from '../models';

@Injectable({
  providedIn: 'root'
})
export class OperativeSituationService {
  constructor(
    private readonly application: ApplicationResource,
    private readonly reports: ReportsResource,
    private readonly consumption: ConsumptionResource
  ) {}

  /**
   * Загрузка данных для инициализации приложения
   */
  getInitialData(): Observable<IServerResponse<IAppInitData>> {
    return from(this.application.getInitialData(null, null, null))
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
    return from(this.reports.get(null, {companyId, divisionId}, null))
      .pipe(
        map((response: IServerResponse<IReportSummary>) => response)
      );
  }

  /**
   * Добавление отчета об оперативной обстановке
   * @param report - Добавляемый отчет об оперативной обстановке
   */
  addReport(report: Report): Observable<IServerResponse<IReportSummary>> {
    return from(this.reports.add(report, null, null))
      .pipe(
        map((response: IServerResponse<IReportSummary>) => response)
      );
  }

  /**
   * Изменение отчета об оперативной обстановке
   * @param report - Изменяемый отчет об оперативной обстановке
   */
  editReport(report: IReport): Observable<IServerResponse<IReportSummary>> {
    return from(this.reports.edit(report, null, {id: report.id}))
      .pipe(
        map((response: IServerResponse<IReportSummary>) => response)
      );
  }

  /**
   * Экспорт отчета об оперативной обстановке в Excel
   * @param time - Время
   */
  exportReport(time: string): Observable<Blob> {
    return from(this.reports.export(null, {time}, null))
      .pipe(
        map((response: Blob) => response)
      );
  }

  /**
   * Добавление отчета о максимальном потреблении за прошедшие сутки
   * @param companyId - Идентификтаор орагнизации
   * @param divisionId - Идентификатор структурного подразделения
   * @param consumption - Максимальное потребление за прошедшие сутки
   */
  addConsumption(companyId: number, divisionId: number, consumption: number): Observable<IServerResponse<number>> {
    return from(this.consumption.add({companyId, divisionId, consumption}, null, null))
      .pipe(
        map((response: IServerResponse<number>) => response)
      );
  }
}
