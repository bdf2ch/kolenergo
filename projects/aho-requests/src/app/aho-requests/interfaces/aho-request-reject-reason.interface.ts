/**
 * Интерфейс, описывающий причину отклоенния заявки АХО
 */
export interface IAhoRequestRejectReason {
  id: number;               // Идентфиикатор
  requestTypeId: number;    // Идентификатор типа заявки
  content: string;          // Содержание
}
