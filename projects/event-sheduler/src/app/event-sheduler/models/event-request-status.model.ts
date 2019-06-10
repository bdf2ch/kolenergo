import { IEventRequestStatus } from '../interfaces';

/**
 * Класс, реализующий интерфейс заявки на меропроиятие
 */
export class EventRequestStatus implements IEventRequestStatus {
  id: number;       // Идентификатор
  title: string;    // Наименование
  icon: string;     // Иконка
  color: string;    // Цвет иконки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEventRequestStatus) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.icon = config ? config.icon : null;
    this.color = config ? config.color : null;
  }
}
