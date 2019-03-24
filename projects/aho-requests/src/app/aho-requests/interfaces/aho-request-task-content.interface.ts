/**
 * Интерфейс, описывающий содержаие задачи заявки АХО
 */
export interface IAhoRequestTaskContent {
  id: number;               // Идентификатор
  requestTypeId: number;    // Идентфиикатор типа заявки
  title: string;            // Наименование
  boxing: string;           // Тара
}
