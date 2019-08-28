import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationCheck, User } from '@kolenergo/core';
import { IApplicationState, selectIsAuthenticationInProgress, selectCurrentUser } from '../ngrx';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements Resolve<User> {
  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>) {}

  checkSession(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticationInProgress),
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
        withLatestFrom(this.store.pipe(select(selectCurrentUser))),
        mergeMap(([fetching, user]) => {
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
