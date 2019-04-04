/**
 * Интерфейс, описывающий право пользователя в приложении
 */
export interface IApplicationPermission {
  id: number;               // Идентификатор
  applicationId: number;    // Идентификатор приложения
  title: string;            // Наименование
  code: string;             // Код
}
