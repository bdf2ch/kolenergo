import { Injectable } from '@angular/core';

import {from, Observable} from 'rxjs';

import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private resource: AuthenticationResource) {}

  signIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string): Observable<User> {
    from(this.resource.signIn({account, password, addIfNotExists, appCode}));
  }
}
