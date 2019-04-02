import { Injectable } from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate} from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, AuthenticationService } from 'kolenergo-core';
import {select, Store} from '@ngrx/store';
import {IApplicationState, selectSelectedRequest} from '../../state';
import {filter} from 'rxjs/operators';
import {AhoRequest} from '../models';
import {selectCurrentUser} from '../../../../../kolenergo-core/src/lib/authentication/state/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  constructor(private readonly store: Store<IApplicationState>,
              private readonly authentication: AuthenticationService) {}

  checkSession(): Observable<IUser> {
    return this.store.pipe(select(selectCurrentUser))
      .pipe(
        filter(user => user instanceof User)
      );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return undefined;
  }
}
