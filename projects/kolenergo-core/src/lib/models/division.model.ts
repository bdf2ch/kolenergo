import {IDivision} from '../interfaces';

/**
 * Класс, реализующий интерфейс структурного подразделения организации
 */
export class Division implements IDivision {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор организации
  title: string;          // Наименование

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDivision) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
  }
}
