import { IUser } from '@kolenergo/core';
import { IAttachment } from '../../portal/interfaces';

/**
 * Интерфейс, описывающий объявления
 */
export interface IAdvert {
  id: number;                   // Идентификатор
  user?: IUser;                 // Пользователь, разместивший объявление
  title: string;                // Заголовок
  preview: string;              // Краткое содержание
  image: string;                // URL изображения объявления
  markup: string;               // Содержание объявления с разметкой
  attachments?: IAttachment[];  // Вложения
  similar?: IAdvert[];          // Похожие объявления
  dateCreated: number;          // Дата публикации в формате Unix
  dateChanged: number;          // Дата изменения в формате Unix
  isTemplate: boolean;          // Является ли объявление шаблоном
}
