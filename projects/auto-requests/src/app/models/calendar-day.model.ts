import * as moment from 'moment';

/**
 * Класс, реализующий день в календаре
 */
export class CalendarDay {
  date: moment.Moment;
  notification: string;
  isActive: boolean;

  /**
   * Конструктор
   * @param date - Дата
   * @param notification - Уведомление
   */
  constructor(date: moment.Moment, notification?: string) {
    this.date = date;
    this.notification = notification ? notification : null;
    this.isActive = true;
  }
}
