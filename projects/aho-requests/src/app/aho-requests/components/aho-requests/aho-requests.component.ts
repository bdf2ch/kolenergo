import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FilterManager, SearchFilter } from '../../models';
import { IApplicationState } from '../../../state';

@Component({
  selector: 'app-aho-requests',
  templateUrl: './aho-requests.component.html',
  styleUrls: ['./aho-requests.component.less']
})
export class AhoRequestsComponent implements OnInit {
  public filters$: Observable<SearchFilter<any>[]>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.filters$ = this.store.select((state: IApplicationState) => state['aho'].filters);

    this.filters$.subscribe((filters: SearchFilter<any>[]) => {
      console.log('FILTERS', filters);
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

  clearSearch() {
    console.log('SEARCH FIELD CLEARED');
  }

  filtersChange(appliedFilters: SearchFilter<any>[]) {
    console.log('applied filters', appliedFilters);
  }
}
