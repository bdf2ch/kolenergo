import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { of } from 'rxjs/internal/observable/of';
import { select, Store } from '@ngrx/store';

import { AuthenticationCheck, User } from 'kolenergo-core';
import { IApplicationState, selectCurrentUser } from '../state';
import { selectIsAuthenticationInProgress } from '../state/selectors';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements Resolve<User> {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly router: Router) {}

  checkSession(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticationInProgress),
      tap((value: boolean) => {

      }),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    this.store.dispatch(new AuthenticationCheck(environment.appCode));
    return this.checkSession()
      .pipe(
        withLatestFrom(this.store.pipe(select(selectCurrentUser))),
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
