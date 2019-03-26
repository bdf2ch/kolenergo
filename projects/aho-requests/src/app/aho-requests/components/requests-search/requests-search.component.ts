import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges
} from '@angular/core';
import { SearchFilter } from '../../models/search-filter.model';
import { FilterManager } from '../../models';

@Component({
  selector: 'app-requests-search',
  templateUrl: './requests-search.component.html',
  styleUrls: ['./requests-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestsSearchComponent implements OnInit, OnChanges {
  @Input() search: string;
  @Input() filters: SearchFilter<any>[];
  @Output() clearSearch: EventEmitter<void> = new EventEmitter();
  @Output() changeFilters: EventEmitter<SearchFilter<any>[]> = new EventEmitter();
  @Output() openFilters: EventEmitter<void> = new EventEmitter();
  public filterManager: FilterManager;

  constructor() {
    this.filters = [];
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['filters']) {
      this.filterManager = new FilterManager(changes['filters'].currentValue);
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
    this.changeFilters.emit(this.filterManager.getAppliedFilters());
  }

  /**
   * Обработчик нажатия на иконку фильтров
   */
  filtersClickHandler() {
    this.openFilters.emit();
  }

}
