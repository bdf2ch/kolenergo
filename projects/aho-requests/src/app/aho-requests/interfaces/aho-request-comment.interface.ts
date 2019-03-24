import { IUser } from 'kolenergo-core';

/**
 * Интерфейс, описывабщий комментарий к заявке АХО
 */
export interface IAhoRequestComment {
  id: number;             // Идентфиикатор
  requestId: number;      // Идентификатор заявки
  user: IUser;            // Пользователь, написавший комментарий
  content: string;        // Содержание
  dateCreated: number;    // Дата создания в формате Unix
}
