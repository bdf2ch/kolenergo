import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import {selectNestedDivisionsByDivisionId, selectSelectedDivision} from '../../ngrx/selectors';
import {IDivision} from '../../../../interfaces';
import {SelectDivision} from '../../ngrx';

@Component({
  selector: 'app-division-tree-item',
  templateUrl: './division-tree-item.component.html',
  styleUrls: ['./division-tree-item.component.less']
})
export class DivisionTreeItemComponent implements OnInit {
  @Input() division: IDivision;
  public nestedDivisions$: Observable<IDivision[]>;
  public selectedDivision$: Observable<IDivision>;
  public isExpanded: boolean;
  public isSelected: boolean;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isExpanded = false;
    this.isSelected = false;
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
  }

  ngOnInit() {
    this.nestedDivisions$ =
      this.store.pipe(select(selectNestedDivisionsByDivisionId, {divisionId: this.division.id}));
  }

  /**
   * Выбор структурного подразделения, а также открытие/закрытие дочерних структурных подразделений
   */
  select() {
    console.log(this.division.title, this.isSelected);
    if (!this.isExpanded) {
      this.isExpanded = true;
      if (!this.isSelected) {
        this.isSelected = true;
        this.store.dispatch(new SelectDivision(this.division));
      } else {
        this.isSelected = false;
      }
    } else {
      this.isExpanded = false;
    }
  }

}
