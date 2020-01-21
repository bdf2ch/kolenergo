import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IDivision } from '../../../../interfaces';
import { IApplicationState } from '../../../../ngrx';
import { selectSelectedCompanyRootDivisions } from '../../ngrx/selectors';

@Component({
  selector: 'app-division-tree',
  templateUrl: './division-tree.component.html',
  styleUrls: ['./division-tree.component.less']
})
export class DivisionTreeComponent implements OnInit {
  public divisions$: Observable<IDivision[]>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.divisions$ = this.store.pipe(select(selectSelectedCompanyRootDivisions));
  }

  ngOnInit() {
  }

}
