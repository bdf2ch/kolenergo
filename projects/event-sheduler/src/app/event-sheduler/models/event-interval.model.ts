import { IEventInterval} from '../interfaces';

/**
 * Класс, реализующий интерфейс, с которым повторяется мероприятие
 */
export class EventInterval implements IEventInterval {
  id: number;             // Идентификатор
  title: string;          // Наименование
  description: string;    // Описание
  offset: number;         // Интервал повторения в секундах

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEventInterval) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
    this.offset = config ? config.offset : null;
  }
}
