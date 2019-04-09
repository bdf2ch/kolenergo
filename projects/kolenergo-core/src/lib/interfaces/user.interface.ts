import { ICompany } from './company.interface';
import { IDivision } from './division.interface';
import { IDepartment } from './department.interface';
import { IApplicationRole } from './application-role.interface';
import { IApplicationPermission } from './application-permission.interface';

/**
 * Интерфейс, описывающий пользователя
 */
export interface IUser {
  id: number;                                    // Идентфиикатор
  firstName: string;                             // Имя
  secondName: string;                            // Отчество
  lastName: string;                              // Фамилия
  position: string;                              // Должность
  photo?: string;                                // Фотография
  company?: ICompany;                            // Организация
  department?: IDepartment;                      // Подразделение орагнизации
  division?: IDivision;                          // Структурное подразделение
  rolesList?: IApplicationRole[];                // Роли пользователя в приложении
  permissionList?: IApplicationPermission[];     // Права пользователя в приложении
}
