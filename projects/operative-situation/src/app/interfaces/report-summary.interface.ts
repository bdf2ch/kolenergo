import { IReport } from './report.interface';
import { IWeatherSummary } from './weather-summary.interface';

/**
 * Интерфейс сводки отчетов по оперативной обстановке
 */
export interface IReportSummary {
  date: string;                                                               // Текущая дата
  // reports: {[period: string]: {[time: string]: IReport | IWeatherSummary}};   // Отчеты, агрегированные по временному периоду
  reports: IReport[];
  consumption: number;                                                        // Максимум потребления за прошедшие сутки
  weather?: IWeatherSummary;                                                  // Погодная сводка
}
