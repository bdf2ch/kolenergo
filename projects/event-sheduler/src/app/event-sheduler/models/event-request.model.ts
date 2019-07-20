import { ICompany, IDepartment, IUser, User, Company, Department } from '@kolenergo/core';
import { IEventRequest } from '../interfaces';
import { EventType } from './event-type.model';
import { EventInterval } from './event-interval.model';
import { EventRequestStatus } from './event-request-status.model';
import * as moment from 'moment';

/**
 * Класс, реализующий интерфейс заявки на мероприятие
 */
export class EventRequest implements IEventRequest {
  id: number;                       // Идентификатор
  type: EventType;                  // Тип мероприятия
  interval: EventInterval;          // Периодичность повторения мероприятия
  status: EventRequestStatus;       // Статус заявки на мероприятия
  user: User;                       // Пользователь подавший заявку
  host: IUser | string;             // Пользователь / сотрудник, организующий мероприятие
  companies: Company[];             // Организации, участвующие в мероприятии
  departments: Department[];        // Подразделения организаций, участвующие в мероприятии
  subject: string;                  // Тематика мероприятия
  description: string;              // Детали мероприятия
  date: string;                     // Дата проведения мероприятия в виде строки
  dateD: Date;                      // Дата проведения мероприятия
  startTime: number;                // Время начала мероприятия в формате Unix
  endTime: number;                  // Время окончания мероприятия в формате Unix
  needProjector: boolean;           // Требуется ли проектор для проведения мероприятия
  needBoard: boolean;               // Требуется ли доска для проведения мероприятия
  numberOfParticipants: number;     // Число участников
  participants: (User | string)[];  // Участники мероприятия
  dateCreated: number;              // Дата и время создания заявки в формате Unix
  dateCreatedD: Date;               // Дата и время создания заявки

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEventRequest) {
    this.id = config ? config.id : null;
    this.type = config ? new EventType(config.type) : null;
    this.interval = config ? new EventInterval(config.interval) : null;
    this.status = config ? new EventRequestStatus(config.status) : null;
    this.user = config ? new User(config.user) : null;
    this.host = config ? (config.host.hasOwnProperty('id') ? new User(config.user as IUser) : config.host as string) : null;
    this.companies = [];
    this.departments = [];
    this.subject = config ? config.subject : null;
    this.description = config ? config.description : null;
    this.date = config ? config.date : null;
    this.dateD = config ? moment(config.date, 'DD.MM.YYYY').toDate() : new Date();
    this.startTime = config ? config.startTime : null;
    this.endTime = config ? config.endTime : null;
    this.needProjector = config ? config.needProjector : false;
    this.needBoard = config ? config.needBoard : false;
    this.numberOfParticipants = config ? config.numberOfParticipants : 3;
    this.participants = [];
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : new Date();

    if (config && config.companies) {
      config.companies.forEach((item: ICompany) => {
        this.companies.push(new Company(item));
      });
    }

    if (config && config.departments) {
      config.departments.forEach((item: IDepartment) => {
        this.departments.push(new Department(item));
      });
    }

    if (config) {
      config.participants.forEach((item: IUser | string) => {
        this.participants.push(item.hasOwnProperty('id') ? new User(item as IUser) : item as string);
      });
    }
  }
}
