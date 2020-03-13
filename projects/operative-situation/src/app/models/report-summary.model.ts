import { IReport, IReportSummary, IWeatherSummary } from '../interfaces';
import { WeatherSummary } from './weather-summary.model';
import { Report} from './report.model';

export class ReportSummary implements IReportSummary {
  date: string;                                                                // Текущая дата
  // reports: {[interval: string]: {[time: string]: IReport | IWeatherSummary}};  // Отчеты, агрегированные по временному периоду
  reports: IReport[];
  consumption: number;                                                         // Максимум потребления за прошедшие сутки
  // weather?: IWeatherSummary;                                                   // Погодная сводка

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IReportSummary) {
    console.log('config', config);
    this.date = config ? config.date : null;
    this.reports = config ? config.reports.map((item: IReport) => new Report(item)) : [];
    this.consumption = config ? config.consumption : null;
    // this.weather = config && config.weather ? new WeatherSummary(config.weather) : null;
    if (config) {
      /*
      for (const interval in config.reports) {
        console.log('interval', config.reports[interval]);
        this.reports[interval] = {};
        for (const time in config.reports[interval]) {
          if (config.reports[interval][time].hasOwnProperty('periodId')) {
            this.reports[interval][time] = new Report(config.reports[interval][time] as IReport);
          } else {
            console.log('weather key', time, config.reports[interval][time]);
            this.reports[interval][time] = new WeatherSummary(config.reports[interval][time] as IWeatherSummary);
          }
        }
      }
      */
    }
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

  /**
   * Получение отчета об оперативнйо обстановке по заданному интервалу и времени отчета
   * @param interval - Временной интервал
   * @param time - Время отчета
   */
  getReportByIntervalAndTime(interval: string, time: string): IReport | null {
    return this.reports[interval] && this.reports[interval][time] ? this.reports[interval][time] as IReport : null;
  }

  getWeatherSummaryByInterval(interval: string): WeatherSummary | null {
    return this.reports[interval] ? this.reports[interval].weatherSummary as WeatherSummary : null;
  }
}

