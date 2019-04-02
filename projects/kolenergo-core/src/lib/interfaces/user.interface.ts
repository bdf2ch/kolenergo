import {ICompany} from './company.interface';
import {IDivision} from './division.interface';

/**
 * Интерфейс, описывающий пользователя
 */
export interface IUser {
  id: number;               // Идентфиикатор
  firstName: string;        // Имя
  secondName: string;       // Отчество
  lastName: string;         // Фамилия
  position: string;         // Должность
  company?: ICompany;       // Организация
  division?: IDivision;     // Структурное подразделение
}
