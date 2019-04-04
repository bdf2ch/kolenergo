/**
 * Интерфейс, описывающий подразделение организации
 */
export interface IDepartment {
  id: number;                   // Идентификатор
  companyId: number;            // Идентификатор организации
  title: string;                // Наименование
  activeDirectoryUid: string;   // Идентификатор Active Directory
}
