import { IAhoRequestTaskContent } from '../interfaces';

/**
 * Класс, реализующий интерфейс содержания задачи заявки АХО
 */
export class AhoRequestTaskContent implements IAhoRequestTaskContent {
  id: number;               // Идентификатор
  requestTypeId: number;    // Идентфиикатор типа заявки
  title: string;            // Наименование
  boxing: string;           // Тара

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestTaskContent) {
    this.id = config ? config.id : null;
    this.requestTypeId = config ? config.requestTypeId : null;
    this.title = config ? config.title : null;
    this.boxing = config ? config.boxing : null;
  }
}
