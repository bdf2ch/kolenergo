import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, withLatestFrom } from 'rxjs/operators';

import { IApplicationState } from '../../../ngrx/application.state';
import { PortalCloseSidebar, PortalOpenSidebar, EPortalActionTypes } from './portal.actions';
import { selectIsSidebarOpened } from './portal.selectors';


@Injectable()
export class PortalEffects {
  constructor(
    private readonly actions: Actions,
    private readonly store: Store<IApplicationState>
  ) {}

  @Effect()
  toggleSidebar$ = this.actions.pipe(
    ofType(EPortalActionTypes.PORTAL_TOGGLE_SIDEBAR),
    withLatestFrom(this.store.pipe(select(selectIsSidebarOpened))),
    map(([action, isSideBarOpened]) => {
      return isSideBarOpened ? new PortalCloseSidebar() : new PortalOpenSidebar();
    })
  );
}
