import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, } from '../../../../ngrx';
import { Report, WeatherSummary } from '../../../../models';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';
import { selectSelectedDivision, selectSelectedReport, selectSelectedReportWeatherSummary } from '../../ngrx/selectors';
import {IDivision} from '../../../../interfaces';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.less']
})
export class ReportComponent implements OnInit {
  public selectedDivision$: Observable<IDivision>;
  public selectedReport$: Observable<Report>;
  public selectedReportWeatherSummary: Observable<WeatherSummary>;
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
    this.selectedReportWeatherSummary = this.store.pipe(select(selectSelectedReportWeatherSummary));
    this.consumptionForm = this.builder.group({
      consumption: new FormControl(0, Validators.required)
    });
  }

  /**
   * Открытие диалогового окна добавления отчета об оперативной обстановке
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '850px',
      panelClass: 'form-step-dialog'
    });
  }

}
