import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FilterManager, SearchFilter } from '../../models';
import {
  IApplicationState,
  selectRequests,
  selectFilters,
  selectFetchingDataInProgress, ApplyFilters, ResetFilters, SetCurrentPage, selectCurrentUser
} from '../../../state';
import { IAhoRequest } from '../../interfaces';
import { FiltersDialogComponent } from '../filters-dialog/filters-dialog.component';
import { User } from 'kolenergo-core';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less']
})
export class AhoRequestsComponent implements OnInit {
  public fetchingDataInProgress$: Observable<boolean>;
  public user$: Observable<User>;
  public requests$: Observable<IAhoRequest[]>;
  public filters$: Observable<FilterManager>;

  constructor(private store: Store<IApplicationState>,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.fetchingDataInProgress$ = this.store.pipe(select(selectFetchingDataInProgress));
    this.user$ = this.store.pipe(
      select(selectCurrentUser),
      take(1)
    );
    this.requests$ = this.store.pipe(
      select(selectRequests),
      take(1)
    );
    this.filters$ = this.store.pipe(
      select(selectFilters),
      take(1)
    );
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
