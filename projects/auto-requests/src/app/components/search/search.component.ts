import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FilterManager } from '@kolenergo/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  @Input() filters: FilterManager;
  @Output() openFilters: EventEmitter<void>;

  constructor() {
    this.openFilters = new EventEmitter<void>();
  }

  ngOnInit() {
  }

  /**
   * Нажатие иконки с фильрами
   */
  onOpenFilters() {
    this.openFilters.emit();
  }

}
