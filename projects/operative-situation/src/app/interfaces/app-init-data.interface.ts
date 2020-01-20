import { ICompany, IUser } from '@kolenergo/core';
import { IDivision } from './division.interface';
import { IPeriod } from './period.interface';
import { IReport } from './report.interface';
import { IConsumption } from './consumption.interface';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IAppInitData {
  companies: ICompany[];        // Список организаций
  divisions: IDivision[];       // Список структурных подразделений
  periods: IPeriod[];           // Список временных периодов
  reports: IReport[];           // Список отчетов об оперативной обстановке
  consumption: IConsumption;    // Максимум потребления за прошедшие сутки
  date: string;                 // Текущая дата
  time: string;                 // Текущее время
  user?: IUser;                 // Текущий пользователь
}
