import { IRejectReason } from '../interfaces/reject-reason.interface';

/**
 * Класс, реализующий интерфейс причины отказа в заявке
 */
export class RejectReason implements IRejectReason {
  id: number;             // Идентификатор
  title: string;          // Наименование
  description: string;    // Описание

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRejectReason) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.description = config && config.description ? config.description : null;
  }
}
