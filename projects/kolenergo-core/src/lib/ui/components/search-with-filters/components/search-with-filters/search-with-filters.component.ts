import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { SearchFilter, FilterManager } from '../../../../../models';

@Component({
  selector: 'lib-search-with-filters',
  templateUrl: './search-with-filters.component.html',
  styleUrls: ['./search-with-filters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchWithFiltersComponent implements OnInit, OnChanges {
  @Input() search: string;
  @Input() placeholder: string;
  @Input() showFilters: boolean;
  @Input() filters: SearchFilter<any>[];
  @Output() clearSearch: EventEmitter<void>;
  @Output() changeFilters: EventEmitter<SearchFilter<any>[]>;
  @Output() openFilters: EventEmitter<void>;
  @Output() change: EventEmitter<string>;
  public filterManager: FilterManager;

  constructor() {
    this.filters = [];
    this.clearSearch = new EventEmitter();
    this.changeFilters = new EventEmitter();
    this.openFilters = new EventEmitter();
    this.change = new EventEmitter();
    this.filterManager = new FilterManager();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.filters) {
      this.filterManager = new FilterManager(changes.filters.currentValue);
    }
  }

  /**
   * Очистка поля вводы поиска
   */
  clearSearchField() {
    this.search = null;
    this.clearSearch.emit();
  }

  /**
   * Сброс фильтра
   * @param filter - Сбрасываемый фильтр
   */
  resetFilter(filter: SearchFilter<any>) {
    filter.reset();
    this.changeFilters.emit(this.filterManager.getFilters());
  }

  /**
   * Обработчик нажатия на иконку фильтров
   */
  filtersClickHandler() {
    this.openFilters.emit();
  }

  /**
   * Обработчик воода в поле ввода
   * @param value - Значение поля ввода
   */
  inputChange(value: string) {
    this.change.emit(value);
  }
}
