import { ICompany, IDepartment } from 'kolenergo-core';

/**
 * Интерфейс, описывающий помещения для проведения мероприятия
 */
export interface IEventLocation {
  id: number;                 // Идентификатор
  company: ICompany;          // Организация
  department: IDepartment;    // Подразделение организации
  title: string;              // Наименование
  description: string;        // Описание
  withProjector: boolean;     // Установлен ли в помещении проектор
  withBoard: boolean;         // Установлена ли в помещении доска
  withVideo: boolean;         // Установлено ли в помещении оборудование для проведения ВКС
  capacity: number;           // Вместимость помещения
}
