import { IPressReport } from '../press-reports/interfaces';
import { ICompany } from '@kolenergo/core';

/**
 * Интерфейс, описывающий структуру данных для инициализации приложения
 */
export interface IApplicationInitialData {
  date: string;               // Текущая дата
  companies: ICompany[];      // Организации
  reports: IPressReport[];    // Отчеты об упоминаниях в СМИ
}
