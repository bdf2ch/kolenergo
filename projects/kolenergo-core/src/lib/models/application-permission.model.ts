import { IApplicationPermission } from '../interfaces/application-permission.interface';

/**
 * Класс, реализующий интерфейс права пользователя в приложении
 */
export class ApplicationPermission implements IApplicationPermission {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  code: string;             // Код

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplicationPermission) {
    this.id = config ? config.id : null;
    this.applicationId = config ? config.applicationId : null;
    this.title = config ? config.title : null;
    this.code = config ? config.code : null;
  }
}
