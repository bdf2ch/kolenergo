import { IAhoRequestRejectReason } from '../interfaces';

/**
 * Класс, реализующий интерфейс причины отклонения заявки АХО
 */
export class AhoRequestRejectReason implements IAhoRequestRejectReason {
  id: number;               // Идентфиикатор
  requestTypeId: number;    // Идентификатор типа заявки
  content: string;          // Содержание

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestRejectReason) {
    this.id = config ? config.id : null;
    this.requestTypeId = config ? config.requestTypeId : null;
    this.content = config ? config.content : null;
  }
}
