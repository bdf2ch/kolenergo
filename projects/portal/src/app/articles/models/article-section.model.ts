import { IArticleSection } from '../interfaces';

/**
 * Класс, реализующий интерфейс раздела статей
 */
export class ArticleSection implements IArticleSection {
  id: number;       // Идентификатор
  title: string;    // Наименование

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IArticleSection) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
  }
}
