import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef}  from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as moment from 'moment';

import { Company, User } from '@kolenergo/core';
import { AddReports, selectCompanies, selectSelectedDate } from '../../ngrx';
import { IApplicationState } from '../../../ngrx/application.state';
import { PressReport } from '../../models';
import { selectCurrentUser } from '../../../ngrx';
import { selectAddingInProgress } from '../../ngrx';


@Component({
  selector: 'app-report-add-dialog',
  templateUrl: './report-add-dialog.component.html',
  styleUrls: ['./report-add-dialog.component.less']
})
export class ReportAddDialogComponent implements OnInit {
  private user$: Observable<User>;
  private companies$: Observable<Company[]>;
  private date$: Observable<Date>;
  private user: User;
  private companies: Company[];
  private date: Date;
  private reportForm: FormGroup;
  private readonly reports: PressReport[];

  constructor(private readonly builder: FormBuilder,
              private readonly dialogRef: MatDialogRef<ReportAddDialogComponent>,
              private readonly store: Store<IApplicationState>) {
    this.user = null;
    this.date = null;
    this.reports = [];
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.date$ = this.store.pipe(select(selectSelectedDate));
    this.reportForm = this.builder.group({});
    this.user$.subscribe((value: User) => {
      this.user = value;
    });
    this.date$.subscribe((value: Date) => {
      this.date = value;
    });
    this.companies$.subscribe((value: Company[]) => {
      this.companies = value;
      this.companies.forEach((company: Company) => {
          const report = new PressReport();
          report.company = company;
          this.reports.push(report);
          this.reportForm.addControl(`company${company.id}`, this.builder.group({
            total: new FormControl(report.publicationsTotal, Validators.required),
            negative: new FormControl(report.publicationsNegative, Validators.required)
          }));
      });
      console.log(this.reportForm);
    });
  }

  addReports() {
    console.log(this.reportForm.value);
    this.reports.forEach((report: PressReport) => {
      report.publicationsTotal = this.reportForm.get(`company${report.company.id.toString()}`).get('total').value;
      report.publicationsNegative = this.reportForm.get(`company${report.company.id.toString()}`).get('negative').value;
      report.dateD = this.date;
      report.date = moment(this.date).format('DD.MM.YYYY');
      report.user = this.user;
    });
    console.log(this.reports);
    this.store.dispatch(new AddReports(this.reports));
  }

}
