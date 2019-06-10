/**
 * Интерфейс, описывающий интервал, с которым повторяется мероприятие
 */
export interface IEventInterval {
  id: number;             // Идентификатор
  title: string;          // Наименование
  description: string;    // Описание
  offset: number;         // Интервал повторения в секундах
}
