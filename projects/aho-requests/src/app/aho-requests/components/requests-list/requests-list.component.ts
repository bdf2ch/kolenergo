import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IAhoRequest } from '../../interfaces';
import { FilterManager } from '../../models';
import { IApplicationState, selectFilters, selectRequests } from '../../../state';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  public requests$: Observable<IAhoRequest[]>;
  public filters$: Observable<FilterManager>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.requests$ = this.store.pipe(select(selectRequests));
    this.filters$ = this.store.pipe(select(selectFilters));
  }

}
