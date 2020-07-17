import { ICopter } from '../interfaces';

/**
 * Класс, реализующий интерфейс коптера
 */
export class Copter implements ICopter {
  id: number;         // Идентификатор
  title: string;      // Наименование
  serial: string;     // Серийный номер

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ICopter) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.serial = config ? config.serial : null;
  }
}
