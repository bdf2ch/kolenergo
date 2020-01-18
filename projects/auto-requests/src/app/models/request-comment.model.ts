import { IUser, User } from '@kolenergo/core';
import { IRequestComment } from '../interfaces/request-comment.interface';

/**
 * Класс, реализующий интерфейс комментария к заявке
 */
export class RequestComment implements IRequestComment {
  id: number;             // Идентификатор
  requestId: number;      // Идентификатор заявки
  user: IUser;            // Пользователь, разместивший комментарий
  message: string;        // Содержание комментария
  dateCreated: number;    // Дата и время публикации комментария в формате Unix
  dateCreatedD: Date;     // Дата и время публикации комментария

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRequestComment) {
    this.id = config ? config.id : null;
    this.requestId = config ? config.requestId : null;
    this.user = config ? new User(config.user) : null;
    this.message = config ? config.message : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : null;
  }
}
