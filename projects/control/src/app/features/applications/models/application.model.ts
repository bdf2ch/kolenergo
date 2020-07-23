import { IApplication } from '../interfaces';

/**
 * Класс, реализующий интерфейс приложения
 */
export class Application implements IApplication {
  id: number;             // Идентификатор
  title: string;          // Наименование
  code: string;           // Код
  description: string;    // Описание

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplication) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.code = config ? config.code : null;
    this.description = config ? config.description : null;
  }
}
