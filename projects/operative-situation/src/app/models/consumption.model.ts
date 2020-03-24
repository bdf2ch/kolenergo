/**
 * Класс, реализующий интерфейс отчета о маскимальном потреблении за прошедшие сутки
 */
export class Consumption {
  companyId: number;      // Идентификатор организации
  divisionId: number;     // Идентификатор структурного подразделения
  // userId: number;         // Идентификатор пользователя
  consumption: number;    // Потребление

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(companyId: number, divisionId: number, consumption: number) {
    this.companyId = companyId;
    this.divisionId = divisionId;
    // this.userId = userId;
    this.consumption = consumption;
  }
}

