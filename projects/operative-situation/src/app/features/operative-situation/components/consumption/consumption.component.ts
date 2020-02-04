import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Report} from '../../../../models';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {selectSelectedReport} from '../../ngrx/selectors';

@Component({
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.less']
})
export class ConsumptionComponent implements OnInit {
  public selectedReport$: Observable<Report>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.selectedReport$ = this.store.pipe(select(selectSelectedReport));
  }

}
