/**
 * Интерфкейс, описывающий тип мероприятия
 */
export interface IEventType {
  id: number;             // Идентфиикатор
  title: string;          // Наименование
  description: string;    // Описание
  icon: string;           // Иконка
  color?: string;         // Цвет иконки
}

