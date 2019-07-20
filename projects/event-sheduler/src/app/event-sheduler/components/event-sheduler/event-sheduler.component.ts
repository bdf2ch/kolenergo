import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import {select, Store} from '@ngrx/store';

import { AuthenticationSignOut, User, FilterManager } from '@kolenergo/core';
import {selectCurrentUser, selectFetchingDataInProgress, selectFilters} from '../../../../../../aho-requests/src/app/state/selectors';
import {IApplicationState} from '../../../ngrx';
import * as state from '../../../ngrx';

@Component({
  selector: 'app-event-sheduler',
  templateUrl: './event-sheduler.component.html',
  styleUrls: ['./event-sheduler.component.less']
})
export class EventShedulerComponent implements OnInit {
  public fetchingDataInProgress$: Observable<boolean>;
  public user$: Observable<User>;
  public filters$: Observable<FilterManager>;

  constructor(private readonly store: Store<state.IApplicationState>) { }

  ngOnInit() {
    this.fetchingDataInProgress$ = this.store.pipe(select(state.selectFetchingDataInProgress));
    this.user$ = this.store.pipe(
      select(state.selectCurrentUser),
      take(1)
    );
    this.filters$ = this.store.pipe(
      select(state.selectFilters)
    );
  }

  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

}
