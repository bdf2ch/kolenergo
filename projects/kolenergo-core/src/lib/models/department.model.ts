import { IDepartment } from '../interfaces/department.interface';

/**
 * Класс, реализующий интерфейс подразделения организации
 */
export class Department implements IDepartment {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  shortTitle: string;           // Краткое наименование
  activeDirectoryUid: string;   // Идентификатор Active Directory

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IDepartment) {
    this.id = config ? config.id : null;
    this.companyId = config ? config.companyId : null;
    this.title = config ? config.title : null;
    this.shortTitle = config ? config.shortTitle : null;
    this.activeDirectoryUid = config ? config.activeDirectoryUid : null;
  }
}
