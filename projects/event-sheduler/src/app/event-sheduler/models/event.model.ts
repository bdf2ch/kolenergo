import { User, Company, IUser } from '@kolenergo/core';
import { IEvent } from '../interfaces';
import { EventType } from './event-type.model';
import { EventInterval } from './event-interval.model';
import { EventLocation } from './event-location.model';
import { EventRequest } from './event-request.model';
import { EventStatus } from './event-status.model';
import { RegularEvent } from './regular-event.model';

/**
 * Класс, реализующий интерфейс мероприятия
 */
export class Event implements IEvent {
  id: number;                           // Идентификатор
  request?: EventRequest;               // Заявка, на основе которой создано мероприятие
  regularEvent?: RegularEvent;          // Повторяющееся мероприятие, на основе которого создано мероприятие
  type: EventType;                      // Тип мероприятия
  interval?: EventInterval;             // Интервал повторения мероприятия
  status: EventStatus;                  // Статус мероприятия
  user: User;                           // Пользователь, создавший мероприятие
  location: EventLocation;              // Помещение, в котором проходит мероприятие
  host: User | string;                  // Пользователь / сотрудник являющийся организатором мероприятия
  companies: Company[];                 // Организации, принимающие участие в мероприятии
  subject: string;                      // Тематика мероприятия
  description: string;                  // Детали мероприятия
  date: string;                         // Дата проведения мероприятия в виде строки
  dateD: Date;                          // Дата проведения мероприятия
  startTime: number;                    // Время начала мероприятия в формате Unix
  endTime: number;                      // Время окончания мероприятия в формате Unix
  checkTime?: number;                   // Время проверки перед мероприятием в формате Unix
  participants: (User | string)[];      // Участниик мероприятия
  rejectReason?: string;                // Причина отмены мероприятия
  dateCreated: number;                  // Дата и время создания мероприятия в формате Unix
  dateCreatedD: Date;                   // Дата и время создания меропряития

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IEvent) {
    this.id = config ? config.id : null;
    this.request = config && config.request ? new EventRequest(config.request) : null;
    this.regularEvent = config && config.regularEvent ? new RegularEvent(config.regularEvent) : null;
    this.type = config ? new EventType(config.type) : null;
    this.interval = config && config.interval ? new EventInterval(config.interval) : null;
    this.status = config ? new EventStatus(config.status) : null;
    this.user = config ? new User(config.user) : null;
    this.location = config ? new EventLocation(config.location) : null;
    this.host = config ? (config.host.hasOwnProperty('id') ? new User(config.user as IUser) : config.host as string) : null;
    this.companies = [];
    this.subject = config ? config.subject : null;
    this.description = config ? config.description : null;
    this.date = config ? config.date : null;
    this.dateD = config ? new Date(config.date) : new Date();
    this.startTime = config ? config.startTime : null;
    this.endTime = config ? config.endTime : null;
    this.checkTime = config && config.checkTime ? config.checkTime : null;
    this.participants = [];
    this.rejectReason = config && config.rejectReason ? config.rejectReason : null;
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : new Date();

    if (config) {
      config.participants.forEach((item: IUser | string) => {
        this.participants.push(item.hasOwnProperty('id') ? new User(item as IUser) : item as string);
      });
    }
  }
}
