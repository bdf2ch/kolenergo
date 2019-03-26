import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterManager, SearchFilter } from '../../models';
import {
  IApplicationState,
  selectRequests,
  selectFilters,
  selectExpiredRequestsCount,
  ApplicationModes,
  selectFetchingDataInProgress
} from '../../../state';
import { IAhoRequest } from '../../interfaces';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less']
})
export class AhoRequestsComponent implements OnInit {
  public fetchingDataInProgress$: Observable<boolean>;
  public requests$: Observable<IAhoRequest[]>;
  public expiredRequestsCount$: Observable<number>;
  public filters$: Observable<FilterManager>;
  public applicationModes = ApplicationModes;

  constructor(private store: Store<IApplicationState>,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchingDataInProgress$ = this.store.pipe(select(selectFetchingDataInProgress));
    this.requests$ = this.store.pipe(select(selectRequests));
    this.filters$ = this.store.pipe(select(selectFilters));

    this.filters$.subscribe((filters: FilterManager) => {
      console.log('FILTERS', filters);
    });

    this.requests$.subscribe((requests: IAhoRequest[]) => {
      console.log('REQUESTS', requests);
    });
  }

  searchFiltersAttached(manager: FilterManager) {
    console.log('SEARCH FILTERS ATTACHED', manager);
    // const startDateFilter = manager.getFilterById('start-date');
    // console.log('startDateFilter', startDateFilter);
    // startDateFilter.setLabel((startDateFilter) => startDateFilter.getValue().toDateString());

    // const endDateFilter = manager.getFilterById('end-date');
    // console.log('endDateFilter', endDateFilter);
    // endDateFilter.setLabel((endDateFilter) => endDateFilter.getValue().toDateString());
  }

  openFiltersDialog() {
    this.dialog.open(FiltersDialogComponent, {
      width: '380px'
    });
  }

  clearSearch() {
    console.log('SEARCH FIELD CLEARED');
  }

  filtersChange(appliedFilters: SearchFilter<any>[]) {
    console.log('applied filters', appliedFilters);
  }
}
