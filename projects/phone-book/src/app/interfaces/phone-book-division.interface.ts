/**
 * Интерфейс, описывающий структурное подразделение справочника
 */
export interface IPhoneBookDivision {
  id: number;           // Идентификатор
  parentId: number;     // Идентификатор структурного подразделения верхнего уровня
  companyId?: number;   // Идентификатор организации
  title: string;        // Наименование
  shortTitle?: string;  // Краткое наименование
  path: string;         // Относительный путь
}
