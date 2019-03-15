import {ICompany, IDivision, IUser} from '../interfaces';
import {Company} from './company.model';
import {Division} from './division.model';

/**
 * Класс, реализующий интерфейс пользователя
 */
export class User implements IUser {
  id: number;               // Идентификатор
  firstName: string;        // Имя
  secondName: string;       // Отчество
  lastName: string;         // Фамилия
  company: ICompany;        // Организация
  division: IDivision;      // Структурное подразделение

  /**
   * Конструктор
   * @param config - параметры инициализации
   */
  constructor(config?: IUser) {
    this.id = config ? config.id : null;
    this.firstName = config ? config.firstName : null;
    this.secondName = config ? config.secondName : null;
    this.lastName = config ? config.lastName : null;
    this.company = config && config.company ? new Company(config.company) : null;
    this.division = config && config.division ? new Division(config.division) : null;
  }
}
