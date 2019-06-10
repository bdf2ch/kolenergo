/**
 * Интерфейс, описывающий статус заявки на мероприятие
 */
export interface IEventRequestStatus {
  id: number;       // Идентификатор
  title: string;    // Наименование
  icon: string;     // Иконка
  color: string;    // Цвет иконки
}
