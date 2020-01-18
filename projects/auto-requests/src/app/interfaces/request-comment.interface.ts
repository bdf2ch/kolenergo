import { IUser } from '@kolenergo/core';

/**
 * Интерфейс, описывающий комментарий к заявке
 */
export interface IRequestComment {
  id: number;             // Идентификатор
  requestId: number;      // Идентфиикатор заявки
  user: IUser;            // Пользователь, написавший комментарий
  message: string;        // Содержание комментария
  dateCreated: number;    // Дата и время публикации в форматке Unix
}
