import { IConsumption } from '../interfaces';

/**
 * Класс, реализующий интерфейс отчета о маскимальном потреблении за прошедшие сутки
 */
export class Consumption implements IConsumption {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор организации
  divisionId: number;     // Идентификатор структурного подразделения
  userId: number;         // Пользователь
  date: string;           // Дата отчета
  consumption: number;    // Потребление

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IConsumption) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.userId = config ? config.userId : null;
    this.date = config ? config.date : null;
    this.consumption = config ? config.consumption : 0;
  }
}

