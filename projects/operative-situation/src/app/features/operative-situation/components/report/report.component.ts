import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, } from '../../../../ngrx';
import { Report } from '../../../../models';
import {
  selectConsumption,
  selectConsumptionLoadingInProgress,
  selectLoadingInProgress,
  selectSelectedDivision,
  selectSelectedReport
} from '../../ngrx/selectors';
import { IDivision } from '../../../../interfaces';
import {AddConsumptionReport} from '../../ngrx';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  public selectedDivision$: Observable<IDivision>;
  public selectedReport$: Observable<Report>;
  public consumption$: Observable<number>;
  public loadingInProgress$: Observable<boolean>;
  public isConsumptionLoading$: Observable<boolean>;
  public inEditConsumptionMode: boolean;
  public consumptionForm: FormGroup;

  constructor(
    private readonly dialog: MatDialog,
    private readonly builder: FormBuilder,
    private readonly store: Store<IApplicationState>
  ) {
    this.inEditConsumptionMode = false;
  }

  ngOnInit() {
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
    this.consumption$ = this.store.pipe(select(selectConsumption));
    this.loadingInProgress$ = this.store.pipe(select(selectLoadingInProgress));
    this.isConsumptionLoading$ = this.store.pipe(select(selectConsumptionLoadingInProgress));
    this.consumptionForm = this.builder.group({
      consumption: new FormControl(0, Validators.required)
    });
    this.isConsumptionLoading$.subscribe((value: boolean) => {
      if (value === false && this.inEditConsumptionMode === true) {
        this.inEditConsumptionMode = false;
      }
    });
    this.consumption$.subscribe((value: number) => {
      if (value) {
        this.consumptionForm.controls.consumption.setValue(value);
      }
    });
  }

  /**
   * Добавление данных о максимальном потреблении за прошедшие сутки
   */
  addConsumption() {
    this.store.dispatch(new AddConsumptionReport(this.consumptionForm.controls.consumption.value));
  }
}
