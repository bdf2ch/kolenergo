/**
 * Интерфейс, описывающий водителя
 */
export interface IDriver {
  id: number;             // Идентификатор
  firstName: string;      // Имя
  secondName?: string;    // Отчество
  lastName: string;       // Фамилия
  phone?: string;         // Контактный телефон
  email?: string;         // E-mail
  isEnabled: boolean;     // Доступен ливодитель для назначения в заявки
}
