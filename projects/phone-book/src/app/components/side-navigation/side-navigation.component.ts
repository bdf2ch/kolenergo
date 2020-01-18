import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, selectCompanies, selectSelectedCompany } from '../../ngrx';
import { PhoneBookDivision } from '../../models';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.less']
})
export class SideNavigationComponent implements OnInit {
  public companies$: Observable<PhoneBookDivision[]>;
  public selectedCompany$: Observable<PhoneBookDivision>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.companies$ = this.store.pipe(select(selectCompanies));
    this.selectedCompany$ = this.store.pipe(select(selectSelectedCompany));
  }

}
