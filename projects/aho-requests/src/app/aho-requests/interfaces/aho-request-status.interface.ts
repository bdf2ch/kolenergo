/**
 * Интерфейс, описывающий статус заявки АХО
 */
export interface IAhoRequestStatus {
  id: number;           // Идентификатор
  title: string;        // Наименование
  icon: string;         // Иконка
  iconColor: string;    // Цвет иконки
}
