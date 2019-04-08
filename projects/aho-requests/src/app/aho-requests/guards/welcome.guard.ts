import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { IApplicationState, selectCurrentUser } from '../../state';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectCurrentUser),
      map((user) => {
        console.log('welcome guard user', user);
        if (!user) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
