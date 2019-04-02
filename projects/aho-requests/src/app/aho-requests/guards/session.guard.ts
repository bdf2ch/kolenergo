import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, AuthenticationService } from 'kolenergo-core';
import {select, Store} from '@ngrx/store';
import {IApplicationState, selectSelectedRequest, selectCurrentUser} from '../../state';
import { catchError, filter, map, mergeMap, take, withLatestFrom } from 'rxjs/operators';
import {AhoRequest} from '../models';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthenticationCheck } from '../../../../../kolenergo-core/src/lib/authentication/state/authentication.actions';
import { selectIsFetchingData } from '../../state/selectors';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly  router: Router,
              private readonly authentication: AuthenticationService) {}

  checkSession(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsFetchingData),
      /*
      tap((user: IUser) => {
        if (!user) {
          this.store.dispatch(new AuthenticationCheck());
        }
      }),

       */
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
          } else {
            return of(true);
          }
        })
      );
  }
}
