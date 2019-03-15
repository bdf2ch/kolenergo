import {ICompany} from '../interfaces';

/**
 * Класс, реализующий интерфейс организации
 */
export class Company implements ICompany {
  id: number;             // Идентификатор
  title: string;          // Наименование
  shortTitle: string;     // Краткое наименование

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ICompany) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.shortTitle = config ? config.shortTitle : null;
  }
}
