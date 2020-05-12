import { IChat } from './chat.interface';
import { IUser } from '@kolenergo/core';

/**
 * Интерфейс, описывающий набор данных для инициализации приложения
 */
export interface IApplicationInitialData {
  chats: IChat[];
  user?: IUser;
}
