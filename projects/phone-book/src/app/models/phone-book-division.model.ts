import { IPhoneBookDivision } from '../interfaces/phone-book-division.interface';

/**
 * Класс, реализующий интерфейс структурного подразделения справочника
 */
export class PhoneBookDivision implements IPhoneBookDivision {
  id: number;           // Идентификатор
  parentId: number;     // Идентификтаор структурного подразделения верхнего уровня
  companyId: number;    // Идентификатор организации
  title: string;        // Наименование
  shortTitle: string;   // Краткое наименование
  path: string;         // Относительный путь

  /**
   * Констурктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IPhoneBookDivision) {
    this.id = config ? config.id : null;
    this.parentId = config ? config.parentId : null;
    this.companyId = config && config.companyId ? config.companyId : null;
    this.title = config ? config.title : null;
    this.shortTitle = config && config.shortTitle ? config.shortTitle : null;
    this.path = config ? config.path : null;
  }
}
