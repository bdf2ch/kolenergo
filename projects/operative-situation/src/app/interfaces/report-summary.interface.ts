import { IReport } from './report.interface';
import { IWeatherSummary } from './weather-summary.interface';

/**
 * Интерфейс сводки отчетов по оперативной обстановке
 */
export interface IReportSummary {
  date: string;                                             // Текущая дата
  reports: {[period: string]: {[time: string]: IReport}};   // Отчеты, агрегированные по временному периоду
  consumption: number;                                      // Максимум потребления за прошедшие сутки
  weather?: IWeatherSummary;                                // Погодная сводка
}
