import { IApplication } from '../interfaces';

/**
 * Класс, реализующий интерфейс приложения
 */
export class Application implements IApplication {
  id: number;                       // Идентификатор
  title: string;                    // Наименование
  code: string;                     // Код
  description: string;              // Описание
  icon: string;                     // Иконка
  color: string;                    // Цвет иконки
  isMaintenanceMode: boolean;       // Находится ли приложение в режиме обслуживания

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IApplication) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.code = config ? config.code : null;
    this.description = config ? config.description : null;
    this.icon = config && config.icon ? config.icon : null;
    this.color = config && config.color ? config.color : null;
    this.isMaintenanceMode = config ? config.isMaintenanceMode : false;
  }
}
