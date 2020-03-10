import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {AuthenticationSignOut, ICompany, User} from '@kolenergo/core';
import { IApplicationState } from '../../../../ngrx';
import {
  LoadInitialData,
  selectCompanies,
  SelectCompany,
  selectDate, selectLoadingInProgress,
  selectSelectedCompany,
  selectSelectedDivision,
  selectUser
} from '../../ngrx';
import { IDivision } from '../../../../interfaces';
import {MatDialog} from "@angular/material/dialog";
import {ReportAddDialogComponent} from "../report-add-dialog/report-add-dialog.component";

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
  public isLoadingInProgress$: Observable<boolean>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {
    this.user$ = this.store.pipe(select(selectUser));
    this.date$ = this.store.pipe(select(selectDate));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.selectedCompany$ = this.store.pipe(select(selectSelectedCompany));
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.isLoadingInProgress$ = this.store.pipe(select(selectLoadingInProgress));
  }

  ngOnInit() {}

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
      panelClass: 'form-step-dialog'
    });
  }

  /**
   * Завершение сессии пользователя
   */
  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

}
