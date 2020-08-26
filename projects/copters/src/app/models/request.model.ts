import { User } from '@kolenergo/core';
import { LocationWeather } from '@kolenergo/osr';
import { IEmployee, IRequest } from '../interfaces';
import { Copter } from './copter.model';
import { Employee } from './employee.model';
import { RequestStatus } from './request-status.model';

/**
 * Класс, реализующий интерфейс заявки на облет
 */
export class Request {
  id: number;                   // Идентификатор
  start: Date;                  // Дата и время начала полета в формате Unix
  end: Date;                    // Дата и время окончания полета в формате Unix
  route: string;                // Маршрут
  description: string;          // Примечания
  dateCreated: Date;            // Дата и время создания заявки
  dateModified: Date;           // Дата и время изменения заявки
  status: RequestStatus;        // Статус заявки
  user: User;                   // Пользователь, подавший заявку
  copter: Copter;               // Коптер
  weather: LocationWeather;     // Погода в точке взлета
  crew: Employee[];             // Экипаж

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRequest) {
    this.id = config ? config.id : null;
    this.start = config ? new Date(config.start) : null;
    this.end = config ? new Date(config.end) : null;
    this.route = config ? config.transport : null;
    this.description = config ? config.description : null;
    this.dateCreated = config ? new Date(config.dateCreated) : null;
    this.dateModified = config ? new Date(config.dateModified) : null;
    this.status = config ? new RequestStatus(config.status) : null;
    this.user = config ? new User(config.user) : null;
    this.copter = config ? new Copter(config.copter) : null;
    this.weather = config ? new LocationWeather(config.weather) : null;
    this.crew = config ? config.crew.map((item: IEmployee) => new Employee(item)) : [];
  }
}
