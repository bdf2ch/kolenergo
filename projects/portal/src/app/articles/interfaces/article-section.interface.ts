import { IArticle } from './article.interface';

/**
 * Интерфейс, описывающий раздел статей
 */
export interface IArticleSection {
  id: number;               // Идентификатор
  title: string;            // Наименование
  articles?: IArticle[];    // Статьи раздела
  total?: number;           // Общее количество статей в разделе
}
