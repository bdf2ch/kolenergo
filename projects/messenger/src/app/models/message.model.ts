import { IAttachment } from '../interfaces/attachment.interface';
import { IImage } from '../interfaces/image.interface';
import { IMessage } from '../interfaces/message.interface';
import { Image } from '../models/image.model';
import { Attachment } from './attachment.model';
import { User } from '@kolenergo/core';

/**
 * Класс, описывющий модель сообщения
 */
export class Message {
  id: number;                   // Идентификатор сообщения
  chatId: number;               // Идентификатор беседы
  userId: number;               // Идентияикатор пользователя
  addresseeId: number;          // Идентификатор адресата сообщения
  text: string;                 // Текст сообщения
  user: User;             // Пользователь, отправивший сообщение
  images: Image[];              // Изображения
  attachments: Attachment[];    // Вложения
  dateCreated: Date;            // Дата и время отправки сообщения
  dateModified: Date;           // Дата и время изменения сообщения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IMessage) {
    this.id = config ? config.id : null;
    this.chatId = config ? config.chatId : null;
    this.userId = config ? config.userId : null;
    this.addresseeId = config ? config.addresseeId : null;
    this.text = config ? config.text : null;
    this.user = config ? new User(config.user) : null;
    this.images = config ? config.images.map((image: IImage) => new Image(image)) : [];
    this.attachments = config ? config.attachments.map((attachment: IAttachment) => new Attachment(attachment)) : [];
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateModified = config ? new Date(config.dateModified) : null;
  }
}
