import { IAttachment } from '../interfaces';

/**
 * Класс, описывающий модель вложения
 */
export class Attachment {
  id: number;             // Идентификатор
  chatId: number;         // Идентификатор беседы
  messageId: number;      // Идентификатор сообщения
  userId: number;         // Идентификатор пользователя, загрузившего файл
  title: string;          // Наименование
  size: number;           // Размер файла в байтах
  extension: string;      // Расширение файла
  dateCreated: Date;      // Дата и время загрузки файла

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAttachment) {
    this.id = config ? config.id : null;
    this.chatId = config ? config.chatId : null;
    this.messageId = config ? config.messageId : null;
    this.userId = config ? config.userId : null;
    this.title = config ? config.title : null;
    this.size = config ? config.size : null;
    this.extension = config && config.title ? config.title.split('.').pop() : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
  }
}
