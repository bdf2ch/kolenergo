import { IRequestStatus } from '../interfaces/request-status.interface';

/**
 * Класс, реализующий интерфейс статуса заявки
 */
export class RequestStatus implements IRequestStatus {
  id: number;         // Идентификатор
  title: string;      // Наименование
  icon: string;       // Иконка
  color: string;      // Цвет иконки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRequestStatus) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.icon = config && config.icon ? config.icon : null;
    this.color = config && config.color ? config.color : null;
  }
}
