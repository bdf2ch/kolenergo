// import { Backup } from '@kolenergo/cpa';
import { IUser, Backup, ICompany, Company, User } from '@kolenergo/core';
import { IConsumption } from '../interfaces';

/**
 * Класс, реализующий интерфейс маскимального потребления за прошедшие сутки
 */
export class Consumption extends Backup implements IConsumption {
  id: number;             // Идентификатор
  date: string;           // Дата
  company: ICompany;      // Организация
  user: IUser;            // Пользователь
  consumption: number;    // Потребление
  dateCreated: Date;      // Дата создания
  dateChanged: Date;      // Дата изменения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IConsumption) {
    super();
    this.id = config ? config.id : null;
    this.date = config ? config.date : null;
    this.company = config ? new Company(config.company) : null;
    this.user = config ? new User(config.user) : null;
    this.consumption = config ? config.consumption : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? new Date(config.dateChanged) : null;
  }
}

