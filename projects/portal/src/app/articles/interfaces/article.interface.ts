import { IUser } from '@kolenergo/core';
import { IAttachment } from '../../portal/interfaces';
import { IArticleSection } from './article-section.interface';

/**
 * Интерфейс, описывающий статью
 */
export interface IArticle {
  id: number;                   // Идентификатор
  section: IArticleSection;     // Раздел статей
  user: IUser;                  // Пользователь, разместивший статью
  title: string;                // Заголовок
  preview: string;              // Краткое содержание
  image: string;                // Изображение
  content: string;              // Содержание
  dateCreated: number;          // Дата создания статьи в формате Unix
  dateChanged: number;          // Дата изменения статьи в формате Unix
  attachments: IAttachment[];   // Вложения
}
