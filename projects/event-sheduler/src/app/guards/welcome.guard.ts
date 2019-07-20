import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store, select } from '@ngrx/store';

import * as state from '../ngrx';

@Injectable({
  providedIn: 'root'
})
export class WelcomeGuard implements CanActivate {

  constructor(private readonly router: Router,
              private readonly store: Store<state.IApplicationState>) {}

  canActivate(next: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(state.selectCurrentUser),
      map((user) => {
        console.log('welcome guard user', user);
        if (user === null) {
          console.log('user!');
          return true;
        } else {
          console.log('no user');
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}
