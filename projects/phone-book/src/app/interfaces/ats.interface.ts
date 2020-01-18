import { EATSType } from '../enums';

/**
 * Интерфейс, описывающий АТС
 */
export interface IATS {
  id: number;               // Идентификатор
  parentId: number;         // Идентификатор АТС верхнего уровня
  type: EATSType;           // Тип АТС
  title: string;            // Наименование
  isSelectable: boolean;    // Доступна ли АТС дял выбора
}
