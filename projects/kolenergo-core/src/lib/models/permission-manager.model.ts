import { ApplicationPermission } from './application-permission.model';
import { ApplicationRole } from './application-role.model';
import { IApplicationPermission } from '../interfaces/application-permission.interface';
import { IApplicationRole } from '../interfaces/application-role.interface';

/**
 * Класс, реализующий функционал менеджера
 * ролей и прав пользователя в приложении
 */
export class PermissionManager {
  private roles: ApplicationRole[];
  private permissions: ApplicationPermission[];

  /**
   * Конструктор
   * @param roles - Список ролей пользователя в приложении
   * @param permissions - Список прав пользователя в приложении
   */
  constructor(roles?: IApplicationRole[], permissions?: IApplicationPermission[]) {
    this.roles = [];
    this.permissions = [];
    if (roles) {
      this.roles = roles.map((role: IApplicationRole) => {
        return new ApplicationRole(role);
      });
    }
    if (permissions) {
      this.permissions = permissions.map((permission: IApplicationPermission) => {
        return new ApplicationPermission(permission);
      });
    }
  }

  /**
   * Поиск роли пользователя по идентификатору роли
   * @param id - Идентификатор роли пользователя в приложении
   */
  getRoleById(id: number) {
    const findRoleById = (role: ApplicationRole) => role.id === id;
    const result = this.roles.find(findRoleById);
    return result ? result : null;
  }

  /**
   * Поиск роли пользователя по коду роли
   * @param code - Код роли пользователя в приложении
   */
  getRoleByCode(code: string) {
    const findRoleByCode = (role: ApplicationRole) => role.code === code;
    const result = this.roles.find(findRoleByCode);
    return result ? result : null;
  }

  /**
   * Поиск права пользователя по идентификатору права
   * @param id - Идентификатор права пользователя в приложении
   */
  getPermissionById(id: number) {
    const findPermissionById = (permission: ApplicationPermission) => permission.id === id;
    const result = this.permissions.find(findPermissionById);
    return result ? result : null;
  }

  /**
   * Поиск права пользователя по коду права
   * @param code - Код права пользователя в приложении
   */
  getPermissionByCode(code: string) {
    const findPermissionByCode = (permission: ApplicationPermission) => permission.code === code;
    const result = this.permissions.find(findPermissionByCode);
    return result ? result : null;
  }
}
