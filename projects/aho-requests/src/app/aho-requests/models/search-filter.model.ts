/**
 * Класс, реализующий функционал фильтра поиска
 */
export class SearchFilter<T> {
  private readonly id: string;                    // Идентификатор
  private readonly title: string;                 // Наиманование
  private readonly label: (value: T) => string;   // Надпись
  private value: T;                               // Значение
  private readonly defaultValue: T;               // Значение по умолчанию

  /**
   * Конструктор
   * @param id - Идентификатор фильтра
   * @param value - Значение фильтра
   * @param defaultValue - Исходное значение фильтра
   */
  constructor(id: string, title: string, value: T, label: (value: T) => string, defaultValue?: T) {
    this.id = id;
    this.title = title;
    this.label = label;
    this.value = value;
    this.defaultValue = defaultValue ? defaultValue : null;
  }

  /**
   * Получение идентификатора фильтра
   */
  getId(): string {
    return this.id;
  }

  /**
   * Получение наименования фильтра
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Получение надписи фильтра
   */
  getLabel(): string {
    return this.label(this.value);
  }

  /**
   * Получение значения фильтра
   */
  getValue(): T {
    return this.value;
  }

  /**
   * Установка нового значения фильтра
   * @param newValue - Новое значение фильтра
   */
  setValue(newValue: T) {
    this.value = newValue;
  }

  /**
   * Получение исходного значения фильтра
   */
  getDefaultValue(): T {
    return this.defaultValue;
  }

  /**
   * Сброс фильтра
   */
  reset() {
    this.value = this.defaultValue;
  }
}
