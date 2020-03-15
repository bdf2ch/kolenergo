/**
 * Класс, описывающий модель временной отметки
 */
export class TimeMark {
  periodId: number;     // Идентификатор временного периода
  time: string;         // Время
  isControl: boolean;   // Является ли временная отметска контрольной

  /**
   * Конструктор
   * @param periodId - Идентификатор временного периода
   * @param time - Время
   */
  constructor(periodId: number, time: string, isControl?: boolean) {
    this.periodId = periodId;
    this.time = time;
    this.isControl = isControl !== undefined ? isControl : false;
  }
}
