import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {RequestsSelectRequest, selectFilteredRequests, selectRequests, selectUserRequests} from '../../ngrx';
import {
  ApplicationSelectListMode,
  IApplicationState,
  selectIsLoading,
  selectListMode,
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
  listModes = EListMode;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectIsLoading));
    this.listMode$ = this.store.pipe(select(selectListMode));
    this.selectedDate$ = this.store.pipe(select(selectSelectedDate));
    this.requests$ = this.store.pipe(select(selectRequests));
    this.userRequests$ = this.store.pipe(select(selectUserRequests));
    this.filteredRequests$ = this.store.pipe(select(selectFilteredRequests));
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
}
