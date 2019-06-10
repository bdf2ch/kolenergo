import { IUser, ICompany } from 'kolenergo-core';
import { IEventType, IEventInterval, IEventLocation, IEventRequest, IEventStatus, IRegularEvent } from './';

/**
 * Интерфейс, описывающий мероприятие
 */
export interface IEvent {
  id: number;                           // Идентификатор
  request?: IEventRequest;              // Заявка, на основе которой создано мероприятие
  regularEvent?: IRegularEvent;         // Повторяющееся мероприятие, на основе которого создано мероприятие
  type: IEventType;                     // Тип мероприятия
  interval?: IEventInterval;            // Интервал повторения мероприятия
  status: IEventStatus;                 // Статус мероприятия
  user: IUser;                          // Пользователь, создавший мероприятие
  location: IEventLocation;             // Помещение, в котором проходит мероприятие
  host: IUser | string;                 // Пользователь / сотрудник являющийся организатором мероприятия
  companies: ICompany[];                // Организации, принимающие участие в мероприятии
  subject: string;                      // Тематика мероприятия
  description: string;                  // Детали мероприятия
  date: Date;                           // Дата проведения меропряития
  startTime: string;                    // Время начала мероприятия
  endTime: string;                      // Время окончания мероприятия
  checkTime?: string;                   // Время проверки перед мероприятием
  participants: (IUser | string)[];     // Участниик мероприятия
  rejectReason?: string;                // Причина отмены мероприятия
  dateCreated: number;                  // Дата и время создания мероприятия в формате Unix
}
