import { IEventStatus } from '../interfaces';

/**
 * Класс, реализующий интерфейс статуса мероприятия
 */
export class EventStatus implements IEventStatus {
  id: number;         // Идентификатор
  title: string;      // Наименование
  icon: string;       // Наименование иконки
  color: string;      // Цвет иконки

  /**
   * Конструкторр
   * @param config - Папраметры инициализации
   */
  constructor(config?: IEventStatus) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.icon = config ? config.icon : null;
    this.color = config ? config.color : null;
  }
}
