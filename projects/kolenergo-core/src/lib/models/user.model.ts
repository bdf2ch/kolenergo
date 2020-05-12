import { ICompany } from '../interfaces/company.interface';
import { IDepartment } from '../interfaces/department.interface';
import { IDivision } from '../interfaces/division.interface';
import { IUser } from '../interfaces/user.interface';
import { Company } from './company.model';
import { Department } from './department.model';
import { Division } from './division.model';
import { PermissionManager } from './permission-manager.model';

/**
 * Класс, реализующий интерфейс пользователя
 */
export class User implements IUser {
  id: number;                       // Идентификатор
  firstName: string;                // Имя
  secondName: string;               // Отчество
  lastName: string;                 // Фамилия
  position: string;                 // Должность
  photo: string;                    // Фотография
  color: string;                    // Цвет автврв
  company: ICompany;                // Организация
  department: IDepartment;          // Подразделение организации
  division: IDivision;              // Структурное подразделение
  permissions?: PermissionManager;  // Менеджер ролей и прав пользователя в приложении

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
    this.photo = config && config.photo ? config.photo : null;
    this.color = this.getAvatarColor(85, 75);
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

  /**
   * Получение инифиалов пользователя
   */
  getInitials(): string {
    return this.firstName[0] + this.lastName[0];
  }

  /**
   * Вычисление цвета аватара пользователя
   */
  getAvatarColor(saturation, lightness) {
    let hash = 0;
    const name = `${this.firstName} ${this.lastName}`;
    for (let i = 0; i < name.length; i++) {
      // tslint:disable-next-line:no-bitwise
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return 'hsl(' + h + ', ' + saturation + '%, ' + lightness + '%)';
  }
}
