import { IUser, User } from '@kolenergo/core';
import { IArticle, IArticleSection } from '../interfaces';
import { IAttachment } from '../../portal/interfaces';
import { ArticleSection } from './article-section.model';
import { Attachment } from '../../portal/models';

/**
 * Класс, реализующий интерфейс статьи
 */
export class Article implements IArticle {
  id: number;                     // Идентификатор
  section: IArticleSection;       // Раздел статей
  user: IUser;                    // Пользователь, разместивший статью
  title: string;                  // Заголовок
  preview: string;                // Краткое содержание статьи
  image: string;                  // Изображение
  content: string;                // Содержание
  dateCreated: number;            // Дата публикации статьи в формате Unix
  dateCreatedD: Date;             // Дата публикации статьи
  dateChanged: number;            // Дата изменения статьи в формате Unix
  dateChangedD: Date;             // Дата изменения статьи
  attachments: IAttachment[];     // Вложения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IArticle) {
    this.id = config ? config.id : null;
    this.section = config && config.section ? new ArticleSection(config.section) : null;
    this.user = config ? new User(config.user) : null;
    this.title = config ? config.title : null;
    this.preview = config ? config.preview : null;
    this.image = config && config.image ? config.image : null;
    this.content = config ? config.content : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? config.dateChanged : null;
    this.dateChangedD = config ? new Date(config.dateChanged) : null;
    this.attachments = [];

    if (config.attachments) {
      this.attachments = config.attachments.map((item: IAttachment) => {
        return new Attachment(item);
      });
    }
  }
}
