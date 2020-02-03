import { IDivision } from '../interfaces';

/**
 * Класс, реализующий интефейс структурного подразделения
 */
export class Division implements IDivision {
  id: number;                   // Идентификатор
  parentId: number;             // Идентификатор структурного подразделения верхнего уровня
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  isReportsAllowed: boolean;    // Допустимо ли добавление отчетов об оперативной обстановке
  children: Division[];         // Дочерние структурные подразделения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDivision) {
    this.id = config ? config.id : null;
    this.parentId = config ? config.parentId : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
    this.isReportsAllowed = config ? config.isReportsAllowed : false;
    this.children = [];
  }
}
