import { IDriver } from '../interfaces/driver.interface';

/**
 * Класс, реализующий интерфейс водителя
 */
export class Driver implements IDriver {
  id: number;             // Идентификатор
  firstName: string;      // Имя
  secondName: string;     // Отчество
  lastName: string;       // Фамилия
  phone: string;          // Контактный телефон
  email: string;          // E-mail
  isEnabled: boolean;     // Доступен ли водителья для назначения в заявки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDriver) {
    this.id = config ? config.id : null;
    this.firstName = config ? config.firstName : null;
    this.secondName = config && config.secondName ? config.secondName : null;
    this.lastName = config ? config.lastName : null;
    this.phone = config && config.phone ? config.phone : null;
    this.email = config && config.email ? config.email : null;
    this.isEnabled = config ? config.isEnabled : true;
  }
}
