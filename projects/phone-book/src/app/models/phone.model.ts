import { IPhone } from '../interfaces/phone.interface';

/**
 * Класс, реализующий интерфейс контактного телефона
 */
export class Phone implements IPhone {
  id: number;           // Идентификатор
  atsId: number;        // Идентификатор АТС
  contactId: number;    // Идентификатор абонента
  number: number;       // Номер телефона

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IPhone) {
    this.id = config ? config.id : null;
    this.atsId = config ? config.atsId : null;
    this.contactId = config ? config.contactId : null;
    this.number = config ? config.number : null;
  }
}
