/**
 * Интерфейс, описывающий тип транспортного средства
 */
export interface ITransportType {
  id: number;                       // Идентификатор
  title: string;                    // Наименование
  description?: string;             // Описание
  isForeignKeyRequired: boolean;    // Требуется ли идентификатор из внешнего источника при подаче заявки на этот тип транспортного средства
  imageUrl?: string;                // URL изображения
}
