import { IReport, IReportSummary, IWeatherSummary } from '../interfaces';
import { WeatherSummary } from './weather-summary.model';
import { Report} from './report.model';

export class ReportSummary implements IReportSummary {
  date: string;                           // Текущая дата
  reports: {[period: string]: Report};   // Отчеты, агрегированные по временному периоду
  consumption: number;                    // Максимум потребления за прошедшие сутки
  weather?: IWeatherSummary;              // Погодная сводка

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IReportSummary) {
    this.date = config ? config.date : null;
    this.reports = {};
    this.consumption = config ? config.consumption : null;
    this.weather = config && config.weather ? new WeatherSummary(config.weather) : null;
    for (const period in config.reports) {
      this.reports[period] = config.reports[period] ? new Report(config.reports[period]) : null;
    }
  }
}
