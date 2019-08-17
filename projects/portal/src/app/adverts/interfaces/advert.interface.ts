import { IUser } from '@kolenergo/core';
import { IAttachment } from '../../portal/interfaces';

/**
 * Интерфейс, описывающий объявления
 */
export interface IAdvert {
  id: number;                   // Идентификатор
  user: IUser;                  // Пользователь, разместивший объявление
  title: string;                // Заголовок
  preview: string;              // Краткое содержание
  content: string;              // Содержание
  dateCreated: number;          // Дата публикации в формате Unix
  dateChanged: number;          // Дата изменения в формате Unix
  attachments?: IAttachment[];  // Вложения
}
