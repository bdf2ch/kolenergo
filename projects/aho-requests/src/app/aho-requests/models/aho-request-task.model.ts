import { IAhoRequestTask, IAhoRequestTaskContent } from '../interfaces';
import { AhoRequestTaskContent } from './aho-request-task-content.model';

/**
 * Класс, реализующий интерфейс задачи заявки АХО
 */
export class AhoRequestTask implements IAhoRequestTask {
  id: number;                         // Идентфикатор
  requestId: number;                  // Идентификатор заявки
  content: IAhoRequestTaskContent;    // Содержание задачи
  count: number;                      // Количественное измерение задачи
  done: boolean;                      // Выполнена ли задача

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestTask) {
    this.id = config ? config.id : null;
    this.requestId = config ? config.requestId : null;
    this.content = config ? new AhoRequestTaskContent(config.content) : null;
    this.count = config ? config.count : null;
    this.done = config ? config.done : false;
  }
}
