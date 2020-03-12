import * as moment from 'moment';
import { IPeriod } from '../interfaces';

/**
 * Класс, реализующий интерфейс временного периода
 */
export class Period implements IPeriod {
  id: number;           // Идентификатор
  time: string;         // Время
  start: string;        // Начало периода
  end: string;          // Окончание периода
  interval: string;     // Интервал временного периода
  marks: string[];      // Промежуточные временные отметки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IPeriod) {
    this.id = config ? config.id : null;
    this.time = config ? config.time : null;
    this.start = config ? config.start : null;
    this.end = config ? config.end : null;
    this.interval = config ? config.interval : null;
    this.marks = [];

    const start = moment(this.start, 'HH:mm');
    const end = moment(this.end, 'HH:mm').subtract(30, 'minutes');
    while (start.unix() < end.unix()) {
      start.add(30, 'minutes');
      this.marks.push(moment(start).format('HH:mm'));
    }
  }
}
