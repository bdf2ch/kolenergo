import { IAhoRequestComment } from '../interfaces';
import { IUser, User } from 'kolenergo-core';

export class AhoRequestComment implements IAhoRequestComment {
  id: number;             // Идентфиикатор
  requestId: number;      // Идентификатор заявки
  user: IUser;            // Пользователь, написавший комментарий
  content: string;        // Содержание
  dateCreated: number;    // Дата создания в формате Unix
  dateCreatedD: Date;     // Дата создания

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestComment) {
    this.id = config ? config.id : null;
    this.requestId = config ? config.requestId : null;
    this.user = config ? new User(config.user) : null;
    this.content = config ? config.content : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
  }
}
