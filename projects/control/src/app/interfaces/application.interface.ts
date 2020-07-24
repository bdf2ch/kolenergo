/**
 * Интерфейс, описывающий приложение
 */
export interface IApplication {
  id: number;                     // Идентификатор
  title: string;                  // Наименование
  code: string;                   // Код
  description: string;            // Описание
  icon?: string;                  // Иконка
  color?: string;                 // Цвет иконки
  isMaintenanceMode: boolean;     // Находится ли приложение в режиме обслуживания
}
