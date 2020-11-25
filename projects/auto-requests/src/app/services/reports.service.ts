import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ReportsResource } from '../resources/reports.resource';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private readonly resource: ReportsResource) {}

  /**
   * Загрузка отчета об использовании транспорта
   * @param periodStart - Начало периода
   * @param periodEnd - Окончание периода
   * @param transportId - Идентификатор транспорта
   */
  loadTransportReport(
    periodStart: number,
    periodEnd: number,
    transportId: number
  ): Observable<Blob> {
    return from(this.resource.loadTransportReport(null, {periodStart, periodEnd, transportId}, null))
      .pipe(
        map((response: Blob) => response)
      );
  }

  /**
   * Загрузка отчета о занятости водителя
   * @param periodStart - Начало периода
   * @param periodEnd - Окончание периода
   * @param driverId - Идентификатор водителя
   */
  loadDriverReport(
    periodStart: number,
    periodEnd: number,
    driverId: number
  ): Observable<Blob> {
    return from(this.resource.loadDriverReport(null, {periodStart, periodEnd, driverId}, null))
      .pipe(
        map((response: Blob) => response)
      );
  }
}
