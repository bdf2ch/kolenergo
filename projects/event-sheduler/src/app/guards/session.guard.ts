import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';

import { select, Store } from '@ngrx/store';

import { AuthenticationCheck, User } from '@kolenergo/core';
import * as state from '../ngrx';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements Resolve<User> {

  constructor(private readonly store: Store<state.IApplicationState>,
              private readonly router: Router) {}

  checkSession(): Observable<boolean> {
    return this.store.pipe(
      select(state.selectIsAuthenticationInProgress),
      tap((value: boolean) => {

      }),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<User> {
    this.store.dispatch(new AuthenticationCheck(environment.appCode));
    return this.checkSession()
      .pipe(
        withLatestFrom(this.store.pipe(select(state.selectCurrentUser))),
        mergeMap(([fetching, user]) => {
          console.log('AUTH GUARD IS FETCHING', fetching);
          console.log('AUTH GUARD USER', user);
          if (!user) {
            this.router.navigate(['/welcome']);
            return of(user);
          } else {
            return of(null);
          }
        }),
        take(1)
      );
  }
}
