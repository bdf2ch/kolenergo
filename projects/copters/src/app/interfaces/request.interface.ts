import { IUser } from '@kolenergo/core';
import { ILocationWeather } from '@kolenergo/osr';
import { ICopter } from './copter.interface';
import { IEmployee } from './employee.interface';
import { IRequestStatus } from './request-status.interface';

/**
 * Интерфейс, описывающий заявку на облет
 */
export interface IRequest {
  id: number;                     // Идентификатор
  start: number;                  // Дата и время начала полета в формате Unix
  end: number;                    // Дата и время окончания полета в формате Unix
  route: string;                  // Маршрут
  description: string;            // Примечания
  dateCreated: number;            // Дата и время создания заявки в формате Unix
  dateModified: number;           // Дата и время изменения заявки в формате Unix
  status: IRequestStatus;         // Статус заявки
  user: IUser;                    // Пользователь, подавший заявку
  copter: ICopter;                // Коптер
  crew: IEmployee[];              // Экипаж
  weather: ILocationWeather;      // Погода в точке взлета
}
