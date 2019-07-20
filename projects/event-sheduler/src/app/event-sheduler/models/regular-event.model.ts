import { User, Company, IUser, ICompany } from '@kolenergo/core';
import { IRegularEvent } from '../interfaces';
import { EventType } from './event-type.model';
import { EventInterval } from './event-interval.model';
import { EventLocation } from './event-location.model';
import { EventRequest } from './event-request.model';
import * as moment from 'moment';

/**
 * Класс, реализующий интерфейс повторяющегося мероприятия
 */
export class RegularEvent implements IRegularEvent {
  id: number;                         // Идентификатор
  request: EventRequest;              // Заявка на мероприятие
  type: EventType;                    // Тип мероприятия
  interval: EventInterval;            // Интервал повторения мероприятия
  location: EventLocation;            // Помещение, в котором проходит мероприятие
  user: User;                         // Пользователь, создавший мероприятие
  host: User | string;                // Пользователь / сотрудник, под руководством которого проходит мероприятие
  companies: Company[];               // Организации, участвующие в мероприятии
  subject: string;                    // Тематика мероприятия
  description: string;                // Детали мероприятия
  startDate: string;                  // Дата начала проведения регулярного мероприятия в виде строки
  startDateD: Date;                   // Дата начала проведения мероприятия
  weekDay: number;                    // День недели, в который проходит мероприятие (от 0 до 6)
  startTime: number;                  // Время начала мероприятия в формате Unix
  endTime: number;                    // Время окончания мероприятия в формате unix
  checkTime: number;                  // Время проверки перед мероприятием в формате Unix
  participants: (User | string)[];    // Участники мероприятия
  dateCreated: number;                // Дата и время создания меропряития в формате Unix
  dateCreatedD: Date;                 // Дата и время создания мероприятия
  dateModified: number;               // Дата и время изменения мероприятия в формате Unix
  dateModifiedD: Date;                // Дата и время изменения мероприятия

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRegularEvent) {
    this.id = config ? config.id : null;
    this.request = config && config.request ? new EventRequest(config.request) : null;
    this.type = config ? new EventType(config.type) : null;
    this.interval = config ? new EventInterval(config.interval) : null;
    this.location = config ? new EventLocation(config.location) : null;
    this.user = config ? new User(config.user) : null;
    this.host = config ? (config.host.hasOwnProperty('id') ? new User(config.host as IUser) : config.host as string) : null;
    this.companies = [];
    this.subject = config ? config.subject : null;
    this.description = config ? config.description : null;
    this.startDate = config ? config.startDate : null;
    this.startDateD = config ? moment(config.startDate, 'DD.MM.YYYY').toDate() : new Date();
    this.weekDay = config ? config.weekDay : null;
    this.startTime = config ? config.startTime : null;
    this.endTime = config ? config.endTime : null;
    this.checkTime = config && config.checkTime ? config.checkTime : null;
    this.participants = [];
    this.dateCreated = config ? config.dateCreated : null;
    this.dateCreatedD = config ? new Date(config.dateCreated) : new Date();
    this.dateModified = config ? config.dateModified : null;
    this.dateModifiedD = config ? new Date(config.dateModified) : new Date();

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
