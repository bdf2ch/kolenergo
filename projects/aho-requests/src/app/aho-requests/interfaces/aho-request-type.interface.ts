/**
 * Интерфейс, описывающий тип заявки АХО
 */
export interface IAhoRequestType {
  id: number;               // Идентификатор
  title: string;            // Наименование
  icon: string;             // Иконка
  order: number;            // Порядок следования
  listTitle: string;        // Заголовок списка задач
  itemTitle: string;        // Заголовок поля ввода задачи
  isCountable: boolean;     // Измеряются ли задачи типа количественно
  countTitle: string;       // Заголовок поля исчисления задачи
  imageUrl: string;         // URL фонового изображения
}
