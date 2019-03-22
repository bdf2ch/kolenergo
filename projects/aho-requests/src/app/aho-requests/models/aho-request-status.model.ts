import { IAhoRequestStatus } from '../interfaces';

/**
 * Класс, реализующий интерфейс статуса заявки АХО
 */
export class AhoRequestStatus implements IAhoRequestStatus {
  id: number;           // Идентификатор
  title: string;        // Наименование
  icon: string;         // Иконка
  iconColor: string;    // Цвет иконки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestStatus) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.icon = config ? config.icon : null;
    this.iconColor = config ? config.iconColor : null;
  }
}
