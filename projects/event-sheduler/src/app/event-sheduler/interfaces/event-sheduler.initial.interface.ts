import { IEventType, IEventLocation, IEventStatus, IEventInterval, IEventRequest, IRegularEvent, IEvent } from './';

/**
 * Интерфейс, описывающий набор данных для иницилизации приложения
 */
export interface IEventShedulerInitialData {
  types: IEventType[];                // Типы мероприятий
  statuses: IEventStatus[];           // Статусы мероприятий
  intervals: IEventInterval[];        // Интервалы повторения мероприятий
  locations: IEventLocation[];        // Помещения дял проведения мероприятий
  requests: IEventRequest[];          // Заявки на проведение мероприятий
  regularEvents: IRegularEvent[];     // Повторяющиеся мероприятия
  events: IEvent[];                   // Мероприятия
}
