import { IPeriod } from '../interfaces';

/**
 * Класс, реализующий интерфейс временного периода
 */
export class Period implements IPeriod {
  id: number;           // Идентификатор
  time: string;         // Время
  interval: string;     // Интервал временного периода

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IPeriod) {
    this.id = config ? config.id : null;
    this.time = config ? config.time : null;
    this.interval = config ? config.interval : null;
  }
}
