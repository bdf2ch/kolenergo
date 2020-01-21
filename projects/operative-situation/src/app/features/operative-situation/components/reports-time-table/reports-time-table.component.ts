import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IPeriod } from '../../../../interfaces';
import { IApplicationState } from '../../../../ngrx';
import { selectPeriods, selectSelectedPeriod } from '../../ngrx/selectors';
import {SelectPeriod} from '../../ngrx';

@Component({
  selector: 'app-reports-time-table',
  templateUrl: './reports-time-table.component.html',
  styleUrls: ['./reports-time-table.component.less']
})
export class ReportsTimeTableComponent implements OnInit {
  public periods$: Observable<IPeriod[]>;
  public selectedPeriod$: Observable<IPeriod>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.periods$ = this.store.pipe(select(selectPeriods));
    // this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
  }

  ngOnInit() {
    this.selectedPeriod$ = this.store.pipe(select(selectSelectedPeriod));
  }

  /**
   * Выбор текущего временного промежутка
   * @param period - Текущий временной промежуток
   */
  selectPeriod(period: IPeriod) {
    this.store.dispatch(new SelectPeriod(period));
  }

}
