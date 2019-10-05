import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { IApplicationState, LoadInitialData, selectIsApplicationInitialized } from '../../ngrx';
import { selectFetchingInProgress } from '../../ngrx';

@Injectable({
  providedIn: 'root'
})
export class InitialDataResolveGuard implements Resolve<boolean> {
  private isApplicationInitialized$: Observable<boolean>;
  private isApplicationInitialized: boolean;

  constructor(private readonly store: Store<IApplicationState>) {
    this.isApplicationInitialized$ = this.store.pipe(select(selectIsApplicationInitialized));
    this.isApplicationInitialized$.subscribe((value: boolean) => {
      this.isApplicationInitialized = value;
    });
  }

  waitForDataToLoad(): Observable<boolean> {
    return this.store.pipe(select(selectFetchingInProgress))
      .pipe(
        filter(isFetching => isFetching === false)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.isApplicationInitialized) {
      return of(true);
    } else {
      this.store.dispatch(new LoadInitialData());
      return this.waitForDataToLoad()
        .pipe(
          switchMap(isFetching => of(isFetching)),
          take(1)
        );
    }
  }
}
