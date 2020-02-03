import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../../ngrx';
import { selectNestedDivisionsByDivisionId, selectSelectedDivision, SelectDivision } from '../../ngrx';
import { IDivision } from '../../../../interfaces';

@Component({
  selector: 'app-division-tree-item',
  templateUrl: './division-tree-item.component.html',
  styleUrls: ['./division-tree-item.component.less']
})
export class DivisionTreeItemComponent implements OnInit {
  @Input() division: IDivision;
  public nestedDivisions$: Observable<IDivision[]>;
  public selectedDivision$: Observable<IDivision>;
  private selectedDivision: IDivision;
  public isExpanded: boolean;
  public isSelected: boolean;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isExpanded = false;
    this.isSelected = false;
    this.selectedDivision$ = this.store.pipe(select(selectSelectedDivision));
    this.selectedDivision$.subscribe((value: IDivision) => {
      this.selectedDivision = value;
    });
  }

  ngOnInit() {
    this.nestedDivisions$ =
      this.store.pipe(select(selectNestedDivisionsByDivisionId, {divisionId: this.division.id}));
  }

  /**
   * Выбор структурного подразделения, а также открытие/закрытие дочерних структурных подразделений
   */
  select() {
    if (this.division === this.selectedDivision) {
      this.isExpanded = !this.isExpanded;
    } else {
      this.store.dispatch(new SelectDivision(this.division));
      this.isExpanded = true;
    }
  }
}
