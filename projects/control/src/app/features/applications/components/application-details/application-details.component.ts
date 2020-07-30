import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Application} from '../../../../models';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {selectSelectedApplication} from '../../ngrx';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.less']
})
export class ApplicationDetailsComponent implements OnInit {
  selectedApplication$: Observable<Application>;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.selectedApplication$ = this.store.pipe(select(selectSelectedApplication));
  }

}
