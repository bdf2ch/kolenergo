import { IEmployeeRole } from '../interfaces';

/**
 * Класс, реализующий интерфейс роли сотрудника
 */
export class EmployeeRole implements IEmployeeRole {
  id: number;         // Идентификатор
  title: string;      // Наименование

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEmployeeRole) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
  }
}
