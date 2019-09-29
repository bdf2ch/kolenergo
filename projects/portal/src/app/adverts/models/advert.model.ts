import { IAdvert } from '../interfaces';
import { IUser, User } from '@kolenergo/core';
import { Attachment } from '../../portal/models';
import { IAttachment } from '../../portal/interfaces';
import { environment } from '../../../environments/environment';

/**
 * Класс, реализующий интерфейс объявления
 */
export class Advert implements IAdvert {
  id: number;                   // Идентификатор
  title: string;                // Заголовок
  preview: string;              // Краткое содержание
  markup: string;               // Содержание объявления с разметкой
  image: string;                // URL изображения объявления
  user: IUser;                  // Пользователь, разместивший объявление
  attachments: Attachment[];    // Вложения
  dateCreated: number;          // Дата публикайии в формате Unix
  dateCreatedD: Date;           // Дата публикации
  dateChanged: number;          // Дата изменения в формате Unix
  dateChangedD: Date;           // Дата изменения
  isTemplate: boolean;          // Является ли объявление шаблоном
  template: Advert;             // Шаблонное обхявление, на основе которого создано объявление

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAdvert) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.preview = config && config.preview ? config.preview : null;
    this.markup = config ? config.markup : null;
    this.image = config && config.image ? `${environment.staticUrl}/${config.image.replace(/\\/g, '/')}` : null;
    this.user = config ? new User(config.user) : null;
    this.attachments = [];
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
    this.dateChanged = config ? config.dateChanged : null;
    this.dateChangedD = config ? new Date(config.dateChanged) : null;
    this.isTemplate = config ? config.isTemplate : false;
    this.template = null;

    if (config && config.attachments) {
      this.attachments = config.attachments.map((item: IAttachment) => {
        return new Attachment(item);
      });
    }
  }

  /**
   * Инициализация модели из другой модели
   * @param advert - Исходная модель
   */
  fromAnother(advert: Advert): Advert {
    const result = new Advert();
    result.id = advert.id;
    result.title = advert.title;
    result.preview = advert.preview;
    result.markup = advert.markup;
    result.image = `${environment.staticUrl}/${advert.image.replace(/\\/g, '/')}`;
    result.user = advert.user;
    result.dateCreated = advert.dateCreated;
    result.dateCreatedD = advert.dateCreatedD;
    result.dateChanged = advert.dateChanged;
    result.dateChangedD = advert.dateChangedD;
    result.attachments = [...advert.attachments];
    return result;
  }

  /**
   * Модель с новым изображением
   * @param url - URL изображения
   */
  changeImage(url: string): Advert {
    this.image = url;
    this.markup = `
        <figure class="image image-style-side">
            <img alt="" src="${environment.staticUrl}/${url.replace(/\\\\/g, '/')}">
        </figure>`;
    return this.fromAnother(this);
  }

  /**
   * Модель с новыми вложениями
   * @param attachments - Вложения
   */
  changeAttachments(attachments: Attachment[]): Advert {
    this.attachments = [...attachments];
    return this.fromAnother(this);
  }
}
