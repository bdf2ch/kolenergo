import { IATS } from '../interfaces/ats.interface';
import { EATSType } from '../enums/ats-type.enum';

/**
 * Класс, реализующий интерфейс АТС
 */
export class ATS implements IATS {
  id: number;               // Идентификатор
  parentId: number;         // Идентфиикатор АТС верхнего уровня
  type: EATSType;           // Тип АТС
  title: string;            // Наименование
  isSelectable: boolean;    // Доступна ли АТС для выбора

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IATS) {
    this.id = config ? config.id : null;
    this.parentId = config ? config.parentId : null;
    this.type = config ? config.type : null;
    this.title = config ? config.title : null;
    this.isSelectable = config ? config.isSelectable : true;
  }
}
