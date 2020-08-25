import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectFilteredRequests, selectRequests, selectUserRequests } from '../../ngrx';
import { ApplicationSelectListMode, IApplicationState, selectListMode } from '../../../../ngrx';
import { Request } from '../../../../models';
import { EListMode } from '../../../../enums';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  listMode$: Observable<EListMode>;
  requests$: Observable<Request[]>;
  userRequests$: Observable<Request[]>;
  filteredRequests$: Observable<Request[]>;
  listModes = EListMode;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.listMode$ = this.store.pipe(select(selectListMode));
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
}
