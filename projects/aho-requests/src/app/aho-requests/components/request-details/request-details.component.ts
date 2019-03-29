import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AhoRequest } from '../../models';
import { IApplicationState, selectSelectedRequest } from '../../../state';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.less']
})
export class RequestDetailsComponent implements OnInit {
  public selectedRequest$: Observable<AhoRequest>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.selectedRequest$ = this.store.pipe(select(selectSelectedRequest));
  }

}
