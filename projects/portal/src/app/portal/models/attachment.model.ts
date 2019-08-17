import { IAttachment } from '../interfaces/attachment.interface';

/**
 * Класс, реализующий интерфейс вложения
 */
export class Attachment implements IAttachment {
  id: number;             // Идентификатор
  advertId: number;       // Идентификатор объявления
  articleId: number;      // Идентификатор статьи
  userId: number;         // Идентфикатор пользователя, загрузившего вложение
  url: string;            // URL файла во вложении
  size: number;           // Размер файла во вложении
  dateCreated: number;    // Дата и время создания записи в формате Unix
  dateCreatedD: Date;     // Дата и время создания записи

  /**
   * Конструктор
   * @param config - Параметры иницмализации
   */
  constructor(config?: IAttachment) {
    this.id = config ? config.id : null;
    this.advertId = config && config.advertId ? config.advertId : null;
    this.articleId = config && config.articleId ? config.articleId : null;
    this.userId = config ? config.userId : null;
    this.size = config ? config.size : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
  }
}
