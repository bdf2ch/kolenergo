import { IDepartment } from './department.interface';

/**
 * Интерфейс, описывающий организацию
 */
export interface ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  shortTitle: string;           // Краткое наименование
  departments?: IDepartment[];  // Подразделения организации
}
