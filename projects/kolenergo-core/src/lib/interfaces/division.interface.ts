/**
 * Интерфейс, описывающий структурное подразделение ораганизации
 */
export interface IDivision {
  id: number;             // Идентификатор
  companyId: number;      // Идентификатор оранизации
  title: string;          // Наименование
}
