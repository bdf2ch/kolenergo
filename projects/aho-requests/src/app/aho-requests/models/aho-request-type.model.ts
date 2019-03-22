import { IAhoRequestType } from '../interfaces';

/**
 * Класс, реализующий тип заявки АХО
 */
export class AhoRequestType implements IAhoRequestType {
  id: number;               // Идентификатор
  title: string;            // Наименование
  icon: string;             // Иконка
  order: number;            // Порядок следования
  listTitle: string;        // Заголовок списка задач
  itemTitle: string;        // Заголовок поля ввода задачи
  isCountable: boolean;     // Измеряются ли задачи типа количественно
  countTitle: string;       // Заголовок поля исчисления задачи
  imageUrl: string;         // URL фонового изображения

  /**
   * Конструктор
   * @param config - Параметры инициализации
   */
  constructor(config?: IAhoRequestType) {
    this.id = config ? config.id : null;
    this.title = config ? config.title : null;
    this.icon = config ? config.icon : null;
    this.order = config ? config.order :  0;
    this.listTitle = config ? config.listTitle : null;
    this.itemTitle = config ? config.itemTitle : null;
    this.isCountable = config ? config.isCountable : false;
    this.countTitle = config ? config.countTitle : null;
    this.imageUrl = config ? config.imageUrl : null;
  }
}
