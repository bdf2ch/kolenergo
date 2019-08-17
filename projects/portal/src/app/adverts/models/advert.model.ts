import { IAdvert } from '../interfaces';
import { IUser, User } from '@kolenergo/core';
import { Attachment } from '../../portal/models';
import { IAttachment } from '../../portal/interfaces';

/**
 * Класс, реализующий интерфейс объявления
 */
export class Advert implements IAdvert {
  id: number;                   // Идентификатор
  title: string;                // Заголовок
  preview: string;              // Краткое содержание
  content: string;              // Содержание
  user: IUser;                  // Пользователь, разместивший объявление
  attachments: Attachment[];    // Вложения
  dateCreated: number;          // Дата публикайии в формате Unix
  dateCreatedD: Date;           // Дата публикации
  dateChanged: number;          // Дата изменения в формате Unix
  dateChangedD: Date;           // Дата изменения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAdvert) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.preview = config && config.preview ? config.preview : null;
    this.content = config ? config.content : null;
    this.user = config ? new User(config.user) : null;
    this.attachments = [];
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? config.dateChanged : null;
    this.dateChangedD = config ? new Date(config.dateChanged) : null;

    if (config && config.attachments) {
      this.attachments = config.attachments.map((item: IAttachment) => {
        return new Attachment(item);
      });
    }
  }
}
