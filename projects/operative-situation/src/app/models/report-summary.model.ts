import { IReport, IReportSummary } from '../interfaces';
import { WeatherSummary } from './weather-summary.model';
import { Report} from './report.model';

export class ReportSummary {
  date: string;             // Текущая дата
  reports: Report[];        // Отчеты об оперативной обстановке
  consumption: number;      // Максимум потребления за прошедшие сутки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IReportSummary) {
    this.date = config ? config.date : null;
    this.reports = config ? config.reports.map((item: IReport) => new Report(item)) : [];
    this.consumption = config ? config.consumption : null;
  }

  /**
   * Поиск первого доступног оотчета во временном периоде
   * @param interval - интервал временного периода
   */
  getFirstReportOfInterval(interval: string): Report | null {
    if (this.reports[interval] !== null) {
      for (const time in this.reports[interval]) {
        if (this.reports[interval][time] !== null) {
          return this.reports[interval][time] as Report;
        }
      }
    }
    return null;
  }

  /**
   * Получение массива контрольного времени отчетов в заданном временном периоде
   * @param interval - Интервал временного периода
   */
  getReportTimesByInterval(interval: string): string[] {
    const result = [];
    if (this.reports[interval] !== null) {
      console.log('interval:', this.reports[interval]);
      for (const time in this.reports[interval]) {
        if (this.reports[interval][time].hasOwnProperty('periodId')) {
          console.log('field', this.reports[interval][time]);
          result.push((this.reports[interval][time] as Report).periodTime);
        }
      }
    }
    return result;
  }

  getWeatherSummaryByInterval(interval: string): WeatherSummary | null {
    return this.reports[interval] ? this.reports[interval].weatherSummary as WeatherSummary : null;
  }
}

