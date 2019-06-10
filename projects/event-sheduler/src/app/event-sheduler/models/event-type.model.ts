import { IEventType } from '../interfaces';

/**
 * Класс, реализующий интерфейс типа мероприятия
 */
export class EventType implements IEventType {
  id: number;             // Идентфиикатор
  title: string;          // Наименование
  description: string;    // Описание

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEventType) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
  }
}
