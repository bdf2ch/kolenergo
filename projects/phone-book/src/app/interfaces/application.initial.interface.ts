import { IUser } from '@kolenergo/core';
import { IPhoneBookDivision } from './phone-book-division.interface';

/**
 * Интерфейс, описывающий структуру данных для инициализации приложения
 */
export interface IInitialData {
  companies: IPhoneBookDivision[];
  divisions: IPhoneBookDivision[];
  user?: IUser;
}
