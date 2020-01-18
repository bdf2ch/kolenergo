/**
 * Интерфейс, описывающий структурное подразделение организации
 */
export interface IDivision {
  id: number;               // Идентификатор
  parentId: number;         // Идентификатор структурного подразделения верхнего уровня
  companyId: number;        // Идентификатор организации
  title: string;            // Наименование
}
