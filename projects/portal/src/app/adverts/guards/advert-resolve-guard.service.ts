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
  private advertId = null;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      if (params.hasOwnProperty('id')) {
        this.advertId = parseInt(params.id, null);
      }
    });
  }

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectFetchingInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.store.dispatch(new AdvertsLoadAdvert(this.advertId));
    return this.waitForDataToLoad()
      .pipe(
        switchMap(isFetching => of(isFetching)),
        take(1)
      );
  }
}
