import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@kolenergo/core';
import { Request } from '../../models';
import { IApplicationState } from '../../ngrx/application.state';
import { selectSelectedRequest } from '../../features/requests/ngrx/requests.selectors';
import { selectIsLoading, selectUser } from '../../ngrx/selectors';
import { RequestsCancelRequest } from '../../features/requests/ngrx/requests.actions';

@Component({
  selector: 'app-request-details-dialog',
  templateUrl: './request-details-dialog.component.html',
  styleUrls: ['./request-details-dialog.component.less']
})
export class RequestDetailsDialogComponent implements OnInit {
  isLoading$: Observable<boolean>;
  user$: Observable<User>;
  selectedRequest$: Observable<Request>;
  initiatorPosition: string;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.user$ = this.store.pipe(select(selectUser));
    this.selectedRequest$ = this.store.pipe(select(selectSelectedRequest));
    this.selectedRequest$.subscribe((val: Request) => {
      this.initiatorPosition = val && val.initiator instanceof User ? val.initiator.position : null;
    });
  }

  ngOnInit() {}

  /**
   * Отмена заявки
   */
  cancelRequest() {
    this.store.dispatch(new RequestsCancelRequest());
  }

}
