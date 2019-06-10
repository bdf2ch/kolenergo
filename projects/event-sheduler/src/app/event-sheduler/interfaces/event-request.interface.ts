import { IUser, ICompany } from 'kolenergo-core';
import { IEventType, IEventInterval, IEventRequestStatus } from './';

/**
 * Интерфейс, описывающий заявку на проведение мероприятия
 */
export interface IEventRequest {
  id: number;                       // Идентификатор
  type: IEventType;                 // Тип мероприятия
  interval: IEventInterval;         // Периодичность повторения мероприятия
  status: IEventRequestStatus;      // Статус заявки на мероприятия
  user: IUser;                      // Пользователь подавший заявку
  companies: ICompany[];            // Организации - участники мероприятия
  subject: string;                  // Тематика мероприятия
  description: string;              // Детали мероприятия
  date: number;                     // Дата проведения мероприятия в формате Unix
  startTime: string;                // Время начала мероприятия
  endTime: string;                  // Время окончания мероприятия
  needProjector: boolean;           // Требуется ли проектор для проведения мероприятия
  needBoard: boolean;               // Требуется ли доска для проведения мероприятия
  needVideo: boolean;               // Требуется ли оборудование для ВКС при проведении мероприятия
  numberOfParticipants: number;     // Число участников
  participants: (IUser | string)[]; // Участники мероприятия
  dateCreated: number;              // Дата и время создания заявки в формате Unix
  dateCreatedD: Date;               // Дата и время создания заявки
}
