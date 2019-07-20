import { ICompany } from '@kolenergo/core';
import { IEventType, IEventLocation, IEventStatus, IEventInterval, IEventRequest, IRegularEvent, IEvent, IEventRequestStatus } from './';

/**
 * Интерфейс, описывающий набор данных для иницилизации приложения
 */
export interface IEventShedulerInitialData {
  companies: ICompany[];                    // Организации
  types: IEventType[];                      // Типы мероприятий
  statuses: IEventStatus[];                 // Статусы мероприятий
  intervals: IEventInterval[];              // Интервалы повторения мероприятий
  locations: IEventLocation[];              // Помещения дял проведения мероприятий
  requestStatuses: IEventRequestStatus[];   // Статусы заявок на мероприятия
  requests: IEventRequest[];                // Заявки на проведение мероприятий
  regularEvents: IRegularEvent[];           // Повторяющиеся мероприятия
  events: IEvent[];                         // Мероприятия
  date: string;                             // Текущая дата в виде строки
}
