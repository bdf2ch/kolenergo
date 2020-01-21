import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import {AuthenticationSignOut, ICompany, User} from '@kolenergo/core';
import { IApplicationState } from '../../../../ngrx';
import {
  LoadInitialData,
  selectCompanies,
  SelectCompany,
  selectDate,
  selectSelectedCompany,
  selectSelectedDivisions,
  selectUser
} from '../../ngrx';
import { IDivision } from '../../../../interfaces';

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

  constructor(private readonly store: Store<IApplicationState>) {
    this.user$ = this.store.pipe(select(selectUser));
    this.date$ = this.store.pipe(select(selectDate));
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.selectedCompany$ = this.store.pipe(select(selectSelectedCompany));
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivisions));
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
   * Завершение сессии пользователя
   */
  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

}
