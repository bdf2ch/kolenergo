import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { IApplicationState, PhoneBookLoadInitialData, selectFetchingInProgress } from '../ngrx';

@Injectable({
  providedIn: 'root'
})
export class InitialGuard implements Resolve<Observable<boolean>> {
  constructor(private readonly store: Store<IApplicationState>) {}

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectFetchingInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new PhoneBookLoadInitialData());
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isFetching => of(isFetching)),
        take(1)
      );
  }
}
