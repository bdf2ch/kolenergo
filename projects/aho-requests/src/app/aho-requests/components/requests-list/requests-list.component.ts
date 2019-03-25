import { Component, Input, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AhoRequest } from '../../models';
import {
  IApplicationState,
  LoadRequests,
  selectCurrentPage,
  selectFetchingDataInProgress,
  selectTotalPagesCount
} from '../../../state';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.less']
})
export class RequestsListComponent implements OnInit {
  @Input() requests: AhoRequest[];
  public totalPages$: Observable<number>;
  public currentPage$: Observable<number>;
  public fetchingDataInProgress$: Observable<boolean>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.totalPages$ = this.store.pipe(select(selectTotalPagesCount));
    this.currentPage$ = this.store.pipe(select(selectCurrentPage));
    this.fetchingDataInProgress$ = this.store.pipe(select(selectFetchingDataInProgress));
  }

  loadNextPage() {
    this.store.dispatch(new LoadRequests());
  }
}
