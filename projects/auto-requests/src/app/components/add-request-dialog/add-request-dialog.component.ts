import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { IApplicationState } from '../../ngrx/application.state';
import { selectDate, selectIsLoading } from '../../ngrx/selectors';
import {minTime} from './time.validator';
import {Moment} from 'moment';

@Component({
  selector: 'app-add-request-dialog',
  templateUrl: './add-request-dialog.component.html',
  styleUrls: ['./add-request-dialog.component.less']
})
export class AddRequestDialogComponent implements OnInit {
  isLoading$: Observable<boolean>;
  date$: Observable<Date>;
  date: Date;
  startTime: Moment;
  endTime: Moment;
  addRequestForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.date$ = this.store.pipe(select(selectDate));
    this.date$.subscribe((value: Date) => {
      this.date = value;
    });
    const minutes = moment().add(15, 'minutes').minutes();
    this.startTime = moment().add(15, 'minutes').minutes(minutes % 10 ? minutes + 10 - minutes % 10 : minutes);
    this.endTime = moment(this.startTime).add(1, 'hours');
    this.addRequestForm = this.builder.group({
      initiator: new FormControl(null),
      date: new FormControl(this.date, Validators.required),
      startTime: new FormControl(this.startTime.format('HH:mm'), [Validators.required, minTime()]),
      endTime: new FormControl(this.endTime.format('HH:mm'), Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

}
