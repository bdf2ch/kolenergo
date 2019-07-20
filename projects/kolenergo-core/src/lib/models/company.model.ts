import { ICompany, IDepartment } from '../interfaces';
import { Department} from './department.model';

/**
 * Класс, реализующий интерфейс организации
 */
export class Company implements ICompany {
  id: number;                   // Идентификатор
  title: string;                // Наименование
  shortTitle: string;           // Краткое наименование
  departments: Department[];    // Подразделения орагнизации

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: ICompany) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.shortTitle = config ? config.shortTitle : null;
    this.departments = [];

    if (config && config.departments) {
      this.departments = config.departments.map((item: IDepartment) => {
        return new Department(item);
      });
    }
  }
}
