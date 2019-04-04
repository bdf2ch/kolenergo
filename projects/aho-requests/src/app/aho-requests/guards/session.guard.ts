import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { select, Store } from '@ngrx/store';

import { AuthenticationCheck } from 'kolenergo-core';
import { IApplicationState, selectCurrentUser } from '../../state';
import { selectIsAuthenticationInProgress } from '../../state/selectors';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly router: Router) {}

  checkSession(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticationInProgress),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    this.store.dispatch(new AuthenticationCheck());
    return this.checkSession()
      .pipe(
        withLatestFrom(this.store.pipe(select(selectCurrentUser))),
        mergeMap(([fetching, user]) => {
          if (!user) {
            this.router.navigate(['/welcome']);
            return of(false);
          } else {
            return of(true);
          }
        }),
        take(1)
      );
  }
}
