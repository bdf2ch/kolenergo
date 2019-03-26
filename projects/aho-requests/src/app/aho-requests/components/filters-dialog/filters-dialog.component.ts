import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, selectFilters, selectRequestStatuses, selectRequestTypes } from '../../../state';
import { AhoRequestStatus, AhoRequestType, FilterManager } from '../../models';
import { take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.less']
})
export class FiltersDialogComponent implements OnInit {
  public filtersForm: FormGroup;
  public filters$: Observable<FilterManager>;
  public requestTypes$: Observable<AhoRequestType[]>;
  public requestStatuses$: Observable<AhoRequestStatus[]>;

  constructor(private store: Store<IApplicationState>,
              private builder: FormBuilder) {}

  ngOnInit() {
    this.filters$ = this.store.pipe(select(selectFilters));
    this.requestTypes$ = this.store.pipe(select(selectRequestTypes));
    this.requestStatuses$ = this.store.pipe(select(selectRequestStatuses));
    this.filtersForm = this.builder.group({
      startDate: new FormControl({value: this.filters$.subscribe(filters => filters.getFilterById('start-date').getValue()), disabled: true}),
      endDate: new FormControl({value: this.filters$.subscribe((filters: FilterManager) => filters.getFilterById('end-date').getValue()), disabled: true}),
      employee: [null],
      requestType: [null],
      requestStatus: [null]
    });
  }

}
