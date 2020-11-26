/**
 * Интерфейс, описывающий водителя
 */
export interface IDriver {
  id: number;             // Идентификатор
  firstName: string;      // Имя
  secondName?: string;    // Отчество
  lastName: string;       // Фамилия
  mobile?: string;        // Контактный телефон
  email?: string;         // E-mail
  isEnabled: boolean;     // Доступен ли водитель для назначения в заявки
}
