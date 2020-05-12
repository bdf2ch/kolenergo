import { IMessage } from './message.interface';
import { IUser } from '@kolenergo/core';

/**
 * Интерфейс, описывающий беседу
 */
export interface IChat {
  id: number;             // Идентификатор
  ownerId: number;        // Идентификатор владельца
  title: string;          // Наименование
  members: IUser[];       // Участники
  messages: IMessage[];   // Сообщения
  dateCreated: number;    // Дата и время создания в формате Unix
  dateModified: number;   // Дата и время изменения в формате Unix
}
