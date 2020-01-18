import { IRoutePoint } from '../interfaces/route-point.interface';

/**
 * Класс, реализующий интерфейс пункт назначения маршрута
 */
export class RoutePoint implements IRoutePoint {
  id: number;       // Идентификатор
  title: string;    // Наименование

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IRoutePoint) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
  }
}
