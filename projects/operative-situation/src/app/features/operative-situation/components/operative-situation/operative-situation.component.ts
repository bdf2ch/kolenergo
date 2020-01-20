import { Component, OnInit } from '@angular/core';
import {IApplicationState} from '../../../../ngrx';
import {Store} from '@ngrx/store';
import {LoadInitialData} from '../../ngrx';

@Component({
  selector: 'app-operative-situation',
  templateUrl: './operative-situation.component.html',
  styleUrls: ['./operative-situation.component.less']
})
export class OperativeSituationComponent implements OnInit {

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    // this.store.dispatch(new LoadInitialData());
  }

}
