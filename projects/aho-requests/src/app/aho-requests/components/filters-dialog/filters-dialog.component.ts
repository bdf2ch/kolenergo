import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {ChangeFilters, IApplicationState, selectFilters, selectRequestStatuses, selectRequestTypes} from '../../../state';
import { AhoRequestStatus, AhoRequestType, FilterManager } from '../../models';
import { take, withLatestFrom } from 'rxjs/operators';
import {MatDatepickerInputEvent, MatSelectChange} from '@angular/material';
import {Moment} from 'moment';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.less']
})
export class FiltersDialogComponent implements OnInit {
  public filters$: Observable<FilterManager>;
  public requestTypes$: Observable<AhoRequestType[]>;
  public requestStatuses$: Observable<AhoRequestStatus[]>;
  public manager: FilterManager;

  constructor(private store: Store<IApplicationState>,
              private builder: FormBuilder) {}

  ngOnInit() {
    this.filters$ = this.store.pipe(select(selectFilters));
    this.requestTypes$ = this.store.pipe(select(selectRequestTypes));
    this.requestStatuses$ = this.store.pipe(select(selectRequestStatuses));

    this.filters$.subscribe((filters: FilterManager) => {
      this.manager = filters;
    });
  }

  startDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.manager.getFilterById('start-date').setValue(event.value.toDate());
  }

  endDateChange(event: MatDatepickerInputEvent<Moment>) {
    this.manager.getFilterById('end-date').setValue(event.value.toDate());
  }

  requestTypeChange(event: MatSelectChange) {
    console.log(event);
    this.manager.getFilterById('request-type').setValue(event.value);
  }

  requestStatusChange(event: MatSelectChange) {
    console.log(event);
    this.manager.getFilterById('request-status').setValue(event.value);
  }

  applyFilters() {
    this.store.dispatch(new ChangeFilters(this.manager.getFilters()));
  }

}
