import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../ngrx/application.state';
import { selectIsLoading } from '../../ngrx/selectors';

@Component({
  selector: 'app-add-request-dialog',
  templateUrl: './add-request-dialog.component.html',
  styleUrls: ['./add-request-dialog.component.less']
})
export class AddRequestDialogComponent implements OnInit {
  isLoading$: Observable<boolean>;
  addRequestForm: FormGroup;

  constructor(
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.addRequestForm = this.builder.group({
      initiator: new FormControl(null),
      date: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.required),
      endTime: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {}

}
