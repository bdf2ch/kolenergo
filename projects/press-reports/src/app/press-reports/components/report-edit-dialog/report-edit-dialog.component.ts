import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';

import { Company, User } from '@kolenergo/core';
import { PressReport } from '../../models';
import { IApplicationState, selectCurrentUser } from '../../../ngrx';
import {AddReports, EditReport, selectCompanies, selectReports, selectSelectedDate} from '../../ngrx';

@Component({
  selector: 'app-report-edit-dialog',
  templateUrl: './report-edit-dialog.component.html',
  styleUrls: ['./report-edit-dialog.component.less']
})
export class ReportEditDialogComponent implements OnInit {
  private user$: Observable<User>;
  private companies$: Observable<Company[]>;
  private reports$: Observable<PressReport[]>;
  private date$: Observable<Date>;
  private user: User;
  private companies: Company[];
  private date: Date;
  private reportForm: FormGroup;
  private reports: PressReport[];

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportEditDialogComponent>,
              private readonly store: Store<IApplicationState>) {
    this.user = null;
    this.date = null;
    this.reports = [];
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.reports$ = this.store.pipe(select(selectReports));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.date$ = this.store.pipe(select(selectSelectedDate));
    this.reportForm = this.builder.group({});
    this.user$.subscribe((value: User) => {
      this.user = value;
    });
    this.reports$.subscribe((value: PressReport[]) => {
      this.reports = value;
    });
    this.date$.subscribe((value: Date) => {
      this.date = value;
    });
    this.reports$.subscribe((value: PressReport[]) => {
      this.reports = value;
      this.reports.forEach((report: PressReport) => {
        this.reportForm.addControl(`company${report.company.id}`, this.builder.group({
          total: new FormControl(report.publicationsTotal, Validators.required),
          negative: new FormControl(report.publicationsNegative, Validators.required)
        }));
      });
    });
  }

  editReport() {
    this.reports.forEach((report: PressReport) => {
      report.publicationsTotal = this.reportForm.get(`company${report.company.id.toString()}`).get('total').value;
      report.publicationsNegative = this.reportForm.get(`company${report.company.id.toString()}`).get('negative').value;
    });
    this.store.dispatch(new EditReport(this.reports));
  }
}
