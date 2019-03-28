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
  selectFetchingDataInProgress, ApplyFilters, LoadOwnRequests, ResetFilters, SetCurrentPage
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
  }

  openFiltersDialog() {
    this.dialog.open(FiltersDialogComponent, {
      width: '380px'
    });
  }

  clearSearch() {}

  filtersChange(filters: SearchFilter<any>[]) {
    const manager = new FilterManager(filters);
    if (manager.isFiltersApplied()) {
      this.store.dispatch(new SetCurrentPage(0));
      this.store.dispatch(new ApplyFilters(filters));
    } else {
      this.store.dispatch(new ResetFilters());
    }
  }
}
