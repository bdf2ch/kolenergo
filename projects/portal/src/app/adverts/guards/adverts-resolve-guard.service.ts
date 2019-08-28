import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { AdvertsLoadAdverts, selectFetchingInProgress } from '../ngrx';

@Injectable({
  providedIn: 'root'
})
export class AdvertsResolveGuard implements Resolve<boolean> {

  constructor(private readonly store: Store<IApplicationState>) {}

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectFetchingInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new AdvertsLoadAdverts());
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isFetching => of(isFetching)),
        take(1)
      );
  }
}
