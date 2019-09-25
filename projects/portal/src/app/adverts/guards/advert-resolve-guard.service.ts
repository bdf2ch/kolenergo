import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../ngrx';
import { AdvertsLoadAdvert, selectFetchingInProgress } from '../ngrx';

@Injectable({
  providedIn: 'root'
})
export class AdvertResolveGuard implements Resolve<boolean> {
  private readonly advertId = null;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly route: ActivatedRoute) {
    console.log('advert resolve guard');
  }

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectFetchingInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log('params', route.params);
    this.store.dispatch(new AdvertsLoadAdvert(parseInt(route.params.id, null)));
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isFetching => of(isFetching)),
        take(1)
      );
  }
}
