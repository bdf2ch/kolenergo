import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { filter, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { ApplicationLoadInitialData, IApplicationState, selectInitialized, selectLoading } from '../ngrx';


@Injectable({
  providedIn: 'root'
})
export class InitializationGuard implements Resolve<any> {
  private isInitialized$: Observable<boolean>;
  private isInitialized: boolean;

  constructor(private readonly router: Router,
              private readonly store: Store<IApplicationState>) {
    this.isInitialized$ = this.store.pipe(select(selectInitialized));
    this.isInitialized$.subscribe((value: boolean) => {
      this.isInitialized = value;
    });
    console.log('INIT GUARD');
  }

  loadInitialData(): Observable<boolean> {
    return this.store.pipe(
      select(selectLoading),
      filter((value: boolean) => value === false),
      take(1)
    );
  }

  resolve(route: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<any> {
    if (!this.isInitialized) {
      this.store.dispatch(new ApplicationLoadInitialData());
      return this.loadInitialData()
        .pipe(
          // withLatestFrom(this.store.pipe(select(selectUser))),
          // mergeMap(([fetching, user]) => {
          mergeMap((fetching) => {
            // if (!user) {
            //  this.router.navigate(['/sign-in']);
            //  return of(user);
            // } else {
              return of(null);
            // }
          }),
          take(1)
        );
    }
  }
}
