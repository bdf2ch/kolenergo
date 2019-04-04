import { ICompany } from '../interfaces/company.interface';
import { IDepartment } from '../interfaces/department.interface';
import { IDivision } from '../interfaces/division.interface';
import { IUser } from '../interfaces/user.interface';
import { Company } from './company.model';
import { Department } from './department.model';
import { Division } from './division.model';
import {PermissionManager} from './permission-manager.model';

/**
 * Класс, реализующий интерфейс пользователя
 */
export class User implements IUser {
  id: number;                       // Идентификатор
  firstName: string;                // Имя
  secondName: string;               // Отчество
  lastName: string;                 // Фамилия
  position: string;                 // Должность
  company: ICompany;                // Организация
  department: IDepartment;          // Подразделение организации
  division: IDivision;              // Структурное подразделение
  permissions: PermissionManager;   // Менеджер ролей и прав пользователя в приложении

  /**
   * Конструктор
   * @param config - параметры инициализации
   */
  constructor(config?: IUser) {
    this.id = config ? config.id : null;
    this.firstName = config ? config.firstName : null;
    this.secondName = config ? config.secondName : null;
    this.lastName = config ? config.lastName : null;
    this.position = config ? config.position : null;
    this.company = config && config.company ? new Company(config.company) : null;
    this.department = config && config.department ? new Department(config.department) : null;
    this.division = config && config.division ? new Division(config.division) : null;
    this.permissions = new PermissionManager();

    if (config && (config.permissionList || config.rolesList)) {
      this.permissions = new PermissionManager(
        config.rolesList ? config.rolesList : null,
        config.permissionList ? config.permissionList : null
      );
    }
  }
}
