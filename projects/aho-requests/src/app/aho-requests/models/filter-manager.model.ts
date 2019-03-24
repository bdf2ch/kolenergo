import { SearchFilter } from './search-filter.model';

export class FilterManager {
  filters: SearchFilter<any>[];   // Фильтры

  /**
   * Конструктор
   */
  constructor(newFilters?: SearchFilter<any>[]) {
    this.filters = newFilters ? newFilters : [];
  }

  /**
   * Поиск фильтра по идентификатору
   * @param id - Идентификатор фильтра
   */
  getFilterById(id: string): SearchFilter<any> {
    const findFilterById = (filter: SearchFilter<any>) => filter.getId() === id;
    const result = this.filters.find(findFilterById);
    return result ? result : null;
  }

  /**
   * Получение примененных фильтров
   */
  getAppliedFilters(): SearchFilter<any>[] {
    return this.filters.filter((filter: SearchFilter<any>) => {
      return filter.getValue() !== filter.getDefaultValue();
    });
  }

  /**
   * Были ли применены фильтры
   */
  isFiltersApplied(): boolean {
    let result = false;
    this.filters.forEach((filter: SearchFilter<any>) => {
      if (filter.getValue() !== filter.getDefaultValue()) {
        result = true;
      }
    });
    return result;
  }

  /**
   * Сброс всех фильтров
   */
  resetFilters() {
    this.filters.forEach((filter: SearchFilter<any>) => {
      filter.reset();
    });
  }
}
