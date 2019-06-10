import { ICompany, IUser, User, Company } from 'kolenergo-core';
import { IEventRequest } from '../interfaces';
import { EventType, EventInterval, EventRequestStatus } from './';

/**
 * Класс, реализующий интерфейс заявки на мероприятие
 */
export class EventRequest implements IEventRequest {
  id: number;                       // Идентификатор
  type: EventType;                  // Тип мероприятия
  interval: EventInterval;          // Периодичность повторения мероприятия
  status: EventRequestStatus;       // Статус заявки на мероприятия
  user: User;                       // Пользователь подавший заявку
  companies: Company[];             // Организации - участники мероприятия
  subject: string;                  // Тематика мероприятия
  description: string;              // Детали мероприятия
  date: number;                     // Дата проведения мероприятия в формате Unix
  dateD: Date;                      // Дата проведения мероприятия
  startTime: string;                // Время начала мероприятия
  endTime: string;                  // Время окончания мероприятия
  needProjector: boolean;           // Требуется ли проектор для проведения мероприятия
  needBoard: boolean;               // Требуется ли доска для проведения мероприятия
  needVideo: boolean;               // Требуется ли оборудование для ВКС при проведении мероприятия
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
    this.companies = [];
    this.subject = config ? config.subject : null;
    this.description = config ? config.description : null;
    this.date = config ? config.date : null;
    this.dateD = config ? new Date(config.date) : new Date();
    this.startTime = config ? config.startTime : null;
    this.endTime = config ? config.endTime : null;
    this.needProjector = config ? config.needProjector : false;
    this.needBoard = config ? config.needBoard : false;
    this.needVideo = config ? config.needVideo : false;
    this.numberOfParticipants = config ? config.numberOfParticipants : null;
    this.participants = [];
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : new Date();

    if (config) {
      config.companies.forEach((item: ICompany) => {
        this.companies.push(new Company(item));
      });

      config.participants.forEach((item: IUser | string) => {
        this.participants.push(item.hasOwnProperty('id') ? new User(item as IUser) : item as string);
      });
    }
  }
}
