import { IUser } from '@kolenergo/core';
import { IEmployeeRole } from './employee-role.interface';

/**
 * Интерфейс, описывающий сотрудника
 */
export interface IEmployee extends IUser {
  role: IEmployeeRole;    // Роль сотрудника
}
