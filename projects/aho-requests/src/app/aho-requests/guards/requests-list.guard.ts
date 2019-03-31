import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable, of } from 'rxjs';

import { IServerResponse } from 'kolenergo-core';
import { IAhoRequest, IAhoRequestsInitialData } from '../interfaces';
import { select, Store } from '@ngrx/store';
import {
  IApplicationState, LoadInitialData,
  LoadRequestDetails, selectApplicationInitialized,
  SelectRequest,
  selectRequests,
  selectSelectedRequest
} from '../../state';
import { AhoRequestsService } from '../services/aho-requests.service';
import { filter, switchMap, take } from 'rxjs/operators';
import { AhoRequest } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RequestsListGuard implements Resolve<boolean> {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly aho: AhoRequestsService) {}

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectApplicationInitialized))
      .pipe(
        filter(isInitialized => isInitialized === true)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new LoadInitialData(34));
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isInitialized => of(isInitialized)),
        take(1)
      );
  }
}
