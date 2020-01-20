import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationCheck, User } from '@kolenergo/core';
import { IApplicationState } from '../ngrx';
import { LoadInitialData, selectLoadingInProgress, selectUser } from '../features/operative-situation/ngrx';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements Resolve<User> {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>) {}

  loadInitialData(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoadingInProgress),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<User> {
    this.store.dispatch(new LoadInitialData());
    return this.loadInitialData()
      .pipe(
        withLatestFrom(this.store.pipe(select(selectUser))),
        tap(() => {
          console.log('tap tap tap');
        }),
        mergeMap(([fetching, user]) => {
          console.log('fetching', fetching);
          if (!user) {
            this.router.navigate(['/sign-in']);
            return of(user);
          } else {
            return of(null);
          }
        }),
        take(1)
      );
  }
}
