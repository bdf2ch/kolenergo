import { ICompany } from '@kolenergo/core';
import { IApplication } from './application.interface';

/**
 * интерфейс, описывающиц набор данных для инициализации приложения
 */
export interface IInitialData {
  applications: IApplication[];     // Приложения
  companies: ICompany[];            // Организации
}
