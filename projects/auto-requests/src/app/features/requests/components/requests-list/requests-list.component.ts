import { Component, OnInit } from '@angular/core';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import { selectRequests } from '../../ngrx';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  requests$: Observable<Request[]>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.requests$ = this.store.pipe(select(selectRequests));
  }

}
