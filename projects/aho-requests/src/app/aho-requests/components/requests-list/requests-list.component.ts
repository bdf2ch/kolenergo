import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IAhoRequest } from '../../interfaces';
import { FilterManager } from '../../models';
import {ApplyFilters, IApplicationState, LoadInitialData, selectFilters, selectIsFiltersApplied, selectRequests} from '../../../state';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  public requests$: Observable<IAhoRequest[]>;
  public filters$: Observable<FilterManager>;
  public isFiltersApplied$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.requests$ = this.store.pipe(select(selectRequests));
    this.filters$ = this.store.pipe(select(selectFilters));
    this.isFiltersApplied$ = this.store.pipe(select(selectIsFiltersApplied));
    // this.store.dispatch(new LoadInitialData(7));

    let manager = null;
    this.filters$.subscribe((value: FilterManager) => {
      manager = value;
    });

    let isFiltersApplied = false;
    this.isFiltersApplied$.subscribe((value: boolean) => {
      isFiltersApplied = value;
    });

    if (isFiltersApplied) {
      this.store.dispatch(new ApplyFilters(manager.getFilters()));
    }
  }

}
