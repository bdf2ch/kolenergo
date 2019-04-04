/**
 * Интерфейс, описывающий роль пользователя в приложении
 */
export interface IApplicationRole {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  code: string;             // Код
  isDefault: boolean;       // Является ли назначаемой по умолчанию
}
