import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthenticationCheck } from '@kolenergo/core';
import { IApplicationState, selectIsAuthenticationInProgress } from '../ngrx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements Resolve<Observable<boolean>> {
  constructor(private readonly store: Store<IApplicationState>) {}

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticationInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new AuthenticationCheck(environment.appCode));
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isFetching => of(isFetching)),
        take(1)
      );
  }
}
