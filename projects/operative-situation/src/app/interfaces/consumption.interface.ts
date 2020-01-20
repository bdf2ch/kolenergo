import { IUser, ICompany } from '@kolenergo/core';
import { IDivision } from './division.interface';

/**
 * Интерфейс, описывающий отчет о максимальном потреблении за прошедшие сутки
 */
export interface IConsumption {
  id: number;               // Идентификатор
  company: ICompany;        // Организация
  division?: IDivision;     // Структурное подразделение
  user: IUser;              // Пользователь
  date: string;             // Дата
  consumption: number;      // потребление
  dateCreated: Date;        // Дата создания
  dateChanged: Date;        // Дата изменения
}
