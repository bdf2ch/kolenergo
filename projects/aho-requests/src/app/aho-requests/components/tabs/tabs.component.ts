import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ApplicationModes, ApplyFilters,
  IApplicationState,
  LoadAllRequests,
  LoadEmployeeRequests,
  LoadExpiredRequests,
  LoadOwnRequests,
  selectEmployeeRequestsCount,
  selectEmployeeUncompletedRequestsCount,
  selectExpiredRequestsCount,
  selectFilteredRequestsCount, selectFilters, selectIsFiltersApplied,
  selectMode,
  selectNewRequestsCount,
  selectOwnRequestsCount,
  selectOwnUncompletedRequestsCount,
  SetCurrentPage
} from '../../../state';
import { FilterManager } from '../../models';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  public applicationModes = ApplicationModes;
  public mode$: Observable<ApplicationModes>;
  public filters$: Observable<FilterManager>;
  public newRequestsCount$: Observable<number>;
  public ownRequestsCount$: Observable<number>;
  public ownUncompletedRequestsCount$: Observable<number>;
  public employeeRequestsCount$: Observable<number>;
  public employeeUncompletedRequestsCount$: Observable<number>;
  public expiredRequestsCount$: Observable<number>;
  public filteredRequestsCount$: Observable<number>;
  public isFiltersApplied$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.mode$ = this.store.pipe(select(selectMode));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.newRequestsCount$ = this.store.pipe(select(selectNewRequestsCount));
    this.ownRequestsCount$ = this.store.pipe(select(selectOwnRequestsCount));
    this.ownUncompletedRequestsCount$ = this.store.pipe(select(selectOwnUncompletedRequestsCount));
    this.employeeRequestsCount$ = this.store.pipe(select(selectEmployeeRequestsCount));
    this.employeeUncompletedRequestsCount$ = this.store.pipe(select(selectEmployeeUncompletedRequestsCount));
    this.expiredRequestsCount$ = this.store.pipe(select(selectExpiredRequestsCount));
    this.filteredRequestsCount$ = this.store.pipe(select(selectFilteredRequestsCount));
    this.isFiltersApplied$ = this.store.pipe(select(selectIsFiltersApplied));
  }

  selectTab(mode: ApplicationModes) {
    let currentMode = null;
    this.mode$.subscribe((item: ApplicationModes) => {
      currentMode = item;
    });
    let filters = null;
    this.filters$.subscribe((manager: FilterManager) => {
      filters = manager;
    });
    this.store.dispatch(new SetCurrentPage(0));

    switch (mode) {
      case ApplicationModes.SEARCH_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.SEARCH_REQUESTS_MODE) {
          this.store.dispatch(new ApplyFilters(filters.getFilters()));
        }
        break;
      }
      case ApplicationModes.ALL_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.ALL_REQUESTS_MODE) {
          this.store.dispatch(new LoadAllRequests());
        }
        break;
      }
      case ApplicationModes.OWN_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.OWN_REQUESTS_MODE) {
          this.store.dispatch(new LoadOwnRequests());
        }
        break;
      }
      case ApplicationModes.EMPLOYEE_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.EMPLOYEE_REQUESTS_MODE) {
          this.store.dispatch(new LoadEmployeeRequests());
        }
        break;
      }
      case ApplicationModes.EXPIRED_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.EXPIRED_REQUESTS_MODE) {
          this.store.dispatch(new LoadExpiredRequests());
        }
        break;
      }
    }
    // this.store.dispatch(new SelectRequestsMode(mode));
  }

}
