import { IApplicationRole } from '../interfaces/application-role.interface';

/**
 * Класс, реализующий интерфейс роли пользователя в приложении
 */
export class ApplicationRole implements IApplicationRole {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  code: string;             // Код
  isDefault: boolean;       // Является ли назначаемой по умолчанию

  /**
   * Конструктор
   * @param config - Параметры инициализавции
   */
  constructor(config?: IApplicationRole) {
    this.id = config ? config.id : null;
    this.applicationId = config ? config.applicationId : null;
    this.title = config ? config.title : null;
    this.code = config ? config.code : null;
    this.isDefault = config ? config.isDefault : false;
  }
}
