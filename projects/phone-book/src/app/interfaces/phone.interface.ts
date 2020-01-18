/**
 * Интерфейс, описывающий контактный телефон
 */
export interface IPhone {
  id: number;
  atsId: number;        // Идентификатор АТС
  contactId: number;    // Идентификатор абонента
  number: number;       // Номер телефона
}
