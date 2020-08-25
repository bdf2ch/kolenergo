/**
 * Интерфейс, описывающий статус заявки
 */
export interface IRequestStatus {
  id: number;                 // Идентификатор
  title: string;              // Наименование
  icon?: string;              // Иконка
  color?: string;             // Цвет иконки
  foregroundColor?: string;   // Вторичный цвет
}
