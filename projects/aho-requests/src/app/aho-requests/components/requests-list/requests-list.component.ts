import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AhoRequest } from '../../models';
import {
  ApplicationModes,
  IApplicationState,
  LoadAllRequests, LoadEmployeeRequests,
  LoadExpiredRequests,
  LoadOwnRequests,
  selectCurrentPage,
  selectFetchingDataInProgress,
  selectMode,
  selectTotalPagesCount,
  SetCurrentPage
} from '../../../state';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  @Input() requests: AhoRequest[];
  private mode$: Observable<ApplicationModes>;
  public totalPages$: Observable<number>;
  public currentPage$: Observable<number>;
  public fetchingDataInProgress$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.mode$ = this.store.pipe(select(selectMode));
    this.totalPages$ = this.store.pipe(select(selectTotalPagesCount));
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.fetchingDataInProgress$ = this.store.pipe(select(selectFetchingDataInProgress));
  }

  loadNextPage() {
    let currentMode = null;
    this.mode$.subscribe((item: ApplicationModes) => {
      currentMode = item;
    });
    let currentPage = null;
    this.currentPage$.subscribe((page: number) => {
      currentPage = page;
    });
    this.store.dispatch(new SetCurrentPage(currentPage + 1));

    switch (currentMode) {
      case ApplicationModes.ALL_REQUESTS_MODE: {
        this.store.dispatch(new LoadAllRequests());
        break;
      }
      case ApplicationModes.OWN_REQUESTS_MODE: {
        this.store.dispatch(new LoadOwnRequests());
        break;
      }
      case ApplicationModes.EMPLOYEE_REQUESTS_MODE: {
        this.store.dispatch(new LoadEmployeeRequests());
        break;
      }
      case ApplicationModes.EXPIRED_REQUESTS_MODE: {
        this.store.dispatch(new LoadExpiredRequests());
        break;
      }
    }
  }
}
