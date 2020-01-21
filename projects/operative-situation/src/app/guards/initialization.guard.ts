import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { AuthenticationCheck, User } from '@kolenergo/core';
import { IApplicationState } from '../ngrx';
import {LoadInitialData, selectApplicationInitialized, selectLoadingInProgress, selectUser} from '../features/operative-situation/ngrx';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements Resolve<User> {
  private isApplicationInitialized$: Observable<boolean>;
  private isApplicationInitialized: boolean;

  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>) {
    this.isApplicationInitialized$ = this.store.pipe(select(selectApplicationInitialized));
    this.isApplicationInitialized$.subscribe((value: boolean) => {
      this.isApplicationInitialized = value;
    });
  }

  loadInitialData(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoadingInProgress),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<User> {
    if (!this.isApplicationInitialized) {
      this.store.dispatch(new LoadInitialData());
      return this.loadInitialData()
        .pipe(
          withLatestFrom(this.store.pipe(select(selectUser))),
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
}
