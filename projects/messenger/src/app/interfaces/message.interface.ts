import { IUser } from '@kolenergo/core';
import { IImage } from './image.interface';
import { IAttachment } from './attachment.interface';

/**
 * Интерфейс, описывающий сообщение чата
 */
export interface IMessage {
  id: number;                   // Идентификатор сообщения
  chatId: number;               // Идентификатор беседы
  userId: number;               // Идентияикатор пользователя
  addresseeId: number;          // Идентификатор адресата сообщения
  text: string;                 // Текст сообщения
  user: IUser;                  // Пользователь, отправивиший сообщений
  images: IImage[];             // Изображения
  attachments: IAttachment[];   // Вложения
  dateCreated: number;          // Дата и время отправки сообщения в формате Unix
  dateModified: number;         // Дата и время изменения сообщения в формате Unix
}
