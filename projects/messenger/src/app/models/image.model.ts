import { IImage } from '../interfaces';

/**
 * Класс, описывающий модель изображения
 */
export class Image {
  id: number;             // Идентификатор
  chatId: number;         // Идентификатор беседы
  messageId: number;      // Идентификатор сообщения
  userId: number;         // Идентификатор пользователя, загрузившего файл
  title: string;          // Наименование
  description: string;    // Описание
  size: number;           // Размер файла в байтах
  dateCreated: Date;      // Дата и время загрузки файла

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IImage) {
    this.id = config ? config.id : null;
    this.chatId = config ? config.chatId : null;
    this.messageId = config ? config.messageId : null;
    this.userId = config ? config.userId : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
    this.size = config ? config.size : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
  }
}
