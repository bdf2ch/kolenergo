import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {AhoRequest, FilterManager} from '../../models';
import {
  ApplicationModes, ApplyFilters,
  IApplicationState,
  LoadAllRequests, LoadEmployeeRequests,
  LoadExpiredRequests,
  LoadOwnRequests,
  selectCurrentPage,
  selectFetchingDataInProgress, selectFilters,
  selectMode,
  selectTotalPagesCount,
  SetCurrentPage
} from '../../../state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-aho-requests-list',
  templateUrl: './aho-requests-list.component.html',
  styleUrls: ['./aho-requests-list.component.less']
})
export class AhoRequestsListComponent implements OnInit {
  @Input() requests: AhoRequest[];
  private mode$: Observable<ApplicationModes>;
  private filters$: Observable<FilterManager>;
  public totalPages$: Observable<number>;
  public currentPage$: Observable<number>;
  public fetchingDataInProgress$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>,
              private router: Router) { }

  ngOnInit() {
    this.mode$ = this.store.pipe(select(selectMode));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.totalPages$ = this.store.pipe(select(selectTotalPagesCount));
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.fetchingDataInProgress$ = this.store.pipe(select(selectFetchingDataInProgress));
  }

  expandRequestTasks(request: AhoRequest, event: MouseEvent) {
    event.cancelBubble = true;
    request.expand();
  }

  showRequestDetails(request: AhoRequest) {
    this.router.navigate(['/', request.id]);
  }

  loadNextPage() {
    let currentMode = null;
    this.mode$.subscribe((item: ApplicationModes) => {
      currentMode = item;
    });
    let filters = null;
    this.filters$.subscribe((manager: FilterManager) => {
      filters = manager.getFilters();
    });
    let currentPage = null;
    this.currentPage$.subscribe((page: number) => {
      currentPage = page;
    });
    this.store.dispatch(new SetCurrentPage(currentPage + 1));

    switch (currentMode) {
      case ApplicationModes.SEARCH_REQUESTS_MODE: {
        this.store.dispatch(new ApplyFilters(filters));
        break;
      }
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
