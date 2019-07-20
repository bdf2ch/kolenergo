import { IEventType, IEventInterval, IEventLocation, IEventRequest } from './';
import { ICompany, IUser } from '@kolenergo/core';


/**
 * Интерфейс, опи сывающий повторяющееся мероприятие
 */
export interface IRegularEvent {
  id: number;                         // Идентификатор
  request?: IEventRequest;            // Заявка на мероприятие
  type: IEventType;                   // Тип мероприятия
  interval: IEventInterval;           // Интервал повторения мероприятия
  location: IEventLocation;           // Помещение, в котором проходит мероприятие
  user: IUser;                        // Пользователь, создавший мероприятие
  host: IUser | string;               // Пользователь / сотрудник, под руководством которого проходит мероприятие
  companies: ICompany[];              // Организации, участвующие в мероприятии
  subject: string;                    // Тематика мероприятия
  description: string;                // Детали мероприятия
  startDate: string;                  // Дата, с котрой начинается регулярное проведение мероприятия в виде строки
  weekDay: number;                    // День недели, в который проходит мероприятие (от 0 до 6)
  startTime: number;                  // Время начала мероприятия в формате Unix
  endTime: number;                    // Время окончания мероприятия в формате Unix
  checkTime?: number;                 // Время проверки перед мероприятием в формате Unix
  participants: (IUser | string)[];   // Участники мероприятия
  dateCreated: number;                // Дата и время создания меропряития в формате Unix
  dateModified: number;               // Дата и время изменения мероприятия в формате Unix
}
