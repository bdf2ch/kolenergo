import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { FilterManager, SearchFilter } from '@kolenergo/core';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  @Input() filters: FilterManager;
  @Output() openFilters: EventEmitter<void>;
  @Output() resetFilter: EventEmitter<SearchFilter<any>>;
  @Output() searchChanged: EventEmitter<string>;
  @Output() searchCleared: EventEmitter<void>;
  searchForm: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    this.openFilters = new EventEmitter<void>();
    this.resetFilter = new EventEmitter<SearchFilter<any>>();
    this.searchChanged = new EventEmitter<string>();
    this.searchCleared = new EventEmitter<void>();
    this.searchForm = this.builder.group({
      query: new FormControl(null)
    });
  }

  ngOnInit() {
    this.searchForm.controls.query.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      console.log('search changed, ', value);
      this.searchChanged.emit(value);
    });
  }

  /**
   * Нажатие иконки с фильрами
   */
  onOpenFilters() {
    this.openFilters.emit();
  }

  /**
   * Сброс фильтра
   * @param filter - Сбрасываемый фильтр
   */
  onResetFilter(filter: SearchFilter<any>) {
    this.resetFilter.emit(filter);
  }

  /**
   * Очистка строки поиска
   */
  onClearSearch() {
    this.searchForm.controls.query.setValue('');
    this.searchCleared.emit();
  }

}
