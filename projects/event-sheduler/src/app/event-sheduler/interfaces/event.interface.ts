import { IUser, ICompany } from '@kolenergo/core';
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
  date: string;                         // Дата проведения меропряития
  startTime: number;                    // Время начала мероприятия в формате Unix
  endTime: number;                      // Время окончания мероприятия в формате Unix
  checkTime?: number;                   // Время проверки перед мероприятием в формате Unix
  participants: (IUser | string)[];     // Участниик мероприятия
  rejectReason?: string;                // Причина отмены мероприятия
  dateCreated: number;                  // Дата и время создания мероприятия в формате Unix
}
