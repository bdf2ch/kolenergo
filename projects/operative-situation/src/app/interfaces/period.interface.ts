/**
 * Интерфейс, описывающий временной период
 */
export interface IPeriod {
  id: number;         // Идентификатор
  time: string;       // Временной период
  start: string;      // Начало периода
  end: string;        // Окончание периода
  interval: string;   // Интервал временного периода
}
