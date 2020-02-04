/**
 * Интерфейс, описывающий отчет о максимальном потреблении за прошедшие сутки
 */
export interface IConsumption {
  id: number;               // Идентификатор
  companyId: number;        // Идентификатор организации
  divisionId: number;       // Идентификатор структурного подразделения
  userId: number;           // Идентификатор пользователя
  date: string;             // Дата отчета
  consumption: number;      // Потребление
}
