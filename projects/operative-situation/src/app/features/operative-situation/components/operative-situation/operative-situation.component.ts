import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AuthenticationSignOut, ICompany, User } from '@kolenergo/core';
import { IApplicationState } from '../../../../ngrx';
import {
  selectCompanies,
  SelectCompany,
  selectDate, selectLoadingInProgress,
  selectSelectedCompany,
  selectSelectedDivision, selectSelectedTime,
  selectUser
} from '../../ngrx';
import { IDivision } from '../../../../interfaces';
import { TimeMark } from '../../../../models';
import { ReportAddDialogComponent } from '../report-add-dialog/report-add-dialog.component';

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {
  public user$: Observable<User>;
  public date$: Observable<Date>;
  public companies$: Observable<ICompany[]>;
  public selectedCompany$: Observable<ICompany>;
  public selectedDivision$: Observable<IDivision>;
  public selectedTime$: Observable<TimeMark>;
  public isLoadingInProgress$: Observable<boolean>;
  public selectedCompany: ICompany;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {
    this.user$ = this.store.pipe(select(selectUser));
    this.date$ = this.store.pipe(select(selectDate));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.selectedCompany$ = this.store.pipe(select(selectSelectedCompany));
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedTime$ = this.store.pipe(select(selectSelectedTime));
    this.isLoadingInProgress$ = this.store.pipe(select(selectLoadingInProgress));
  }

  ngOnInit() {
    this.selectedCompany$.subscribe((value: ICompany) => {
      if (value) {
        this.selectedCompany = value;
      }
    });
  }

  /**
   * Выбор текущей организации
   * @param company - Текущая организация
   */
  selectCompany(company: ICompany) {
    this.store.dispatch(new SelectCompany(company));
  }

  /**
   * Открытие диалогового окна добавления отчета об оперативной обстановке
   */
  openAddReportDialog() {
    this.dialog.open(ReportAddDialogComponent, {
      id: 'add-report-dialog',
      width: '850px',
      // height: '580px',
      panelClass: 'form-step-dialog'
    });
  }

  loadReportByCompany() {
    this.store.dispatch(new SelectCompany(this.selectedCompany));
  }

  /**
   * Завершение сессии пользователя
   */
  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

}
