import { IAhoRequestTaskContent } from './aho-request-task-content.interface';

/**
 * Интерфейс, описывающий задачу в заявке АХО
 */
export interface IAhoRequestTask {
  id: number;                         // Идентфикатор
  requestId: number;                  // Идентификатор заявки
  content: IAhoRequestTaskContent;    // Содержание задачи
  count: number;                      // Количественное измерение задачи
  done: boolean;                      // Выполнена ли задача
}
