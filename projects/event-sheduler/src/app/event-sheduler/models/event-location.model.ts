import { Company, Department } from '@kolenergo/core';
import { IEventLocation } from '../interfaces';

/**
 * Класс, реализующий интерфейс помещения для проведения мероприятия
 */
export class EventLocation implements IEventLocation {
  id: number;                 // Идентификатор
  company: Company;           // Организация
  department: Department;     // Подразделение организации
  title: string;              // Наименование
  description: string;        // Описание
  withProjector: boolean;     // Установлен ли в помещении проектор
  withBoard: boolean;         // Установлена ли в помещении доска
  withVideo: boolean;         // Установлено ли в помещении оборудование для проведения ВКС
  capacity: number;           // Вместимость помещения

  /**
   * Конструктор
   * @param config - Параметрв инициализации
   */
  constructor(config?: IEventLocation) {
    this.id = config ? config.id : null;
    this.company = config ? new Company(config.company) : null;
    this.department = config ? new Department(config.department) : null;
    this.title = config ? config.title : null;
    this.description = config ? config.description : null;
    this.withProjector = config ? config.withProjector : false;
    this.withBoard = config ? config.withBoard : false;
    this.withVideo = config ? config.withVideo : false;
    this.capacity = config ? config.capacity : null;
  }
}
