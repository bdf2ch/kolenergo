/**
 * Класс, описывающий модель временной отметки
 */
export class TimeMark {
  periodId: number;   // Идентификатор временного периода
  time: string;       // Время

  /**
   * Конструктор
   * @param periodId - Идентификатор временного периода
   * @param time - Время
   */
  constructor(periodId: number, time: string) {
    this.periodId = periodId;
    this.time = time;
  }
}
