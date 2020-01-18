/**
 * Интерфейс, описывающий причину отказа в заявке
 */
export interface IRejectReason {
  id: number;              // Идентификатор
  title: string;           // Наименование
  description?: string;    // Описание
}
