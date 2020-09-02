import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterManager } from '@kolenergo/core';
import {
  RequestsExportRequests,
  RequestsSelectRequest,
  selectFilteredRequests,
  selectRequests,
  selectUserRequests
} from '../../ngrx';
import {
  ApplicationSelectListMode,
  IApplicationState,
  selectFilters,
  selectIsLoading,
  selectListMode, selectSearch,
  selectSelectedDate
} from '../../../../ngrx';
import { Request } from '../../../../models';
import { EListMode } from '../../../../enums';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  loading$: Observable<boolean>;
  listMode$: Observable<EListMode>;
  selectedDate$: Observable<Date>;
  requests$: Observable<Request[]>;
  userRequests$: Observable<Request[]>;
  filteredRequests$: Observable<Request[]>;
  filters$: Observable<FilterManager>;
  listModes = EListMode;
  search$: Observable<string>;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectIsLoading));
    this.listMode$ = this.store.pipe(select(selectListMode));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.requests$ = this.store.pipe(select(selectRequests));
    this.userRequests$ = this.store.pipe(select(selectUserRequests));
    this.filteredRequests$ = this.store.pipe(select(selectFilteredRequests));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.search$ = this.store.pipe(select(selectSearch));
  }

  /**
   * Выбор режима отображения списка заявок
   * @param mode - Режим отображения списка заявок
   */
  selectListMode(mode: EListMode) {
    this.store.dispatch(new ApplicationSelectListMode(mode));
  }

  /**
   * Выбор текущей заявки
   * @param request - Выбранная заявка
   */
  selectRequest(request: Request) {
    this.store.dispatch(new RequestsSelectRequest(request));
  }

  /**
   * Экспорт заявок
   */
  exportRequests() {
    this.store.dispatch(new RequestsExportRequests());
  }
}
