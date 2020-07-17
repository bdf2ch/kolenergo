import { User } from '@kolenergo/core';
import { IEmployee, IEmployeeRole } from '../interfaces';
import { EmployeeRole } from './employee-role.model';

/**
 * Класс, реализующий модель сотрудника
 */
export class Employee extends User {
  role: IEmployeeRole;    // Роль сотрудника

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEmployee) {
    super();
    this.role = config ? new EmployeeRole(config.role) : null;
  }
}
