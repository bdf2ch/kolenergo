import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../models';
import { IUser } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private resource: AuthenticationResource) {}

  signIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string): Observable<any> {
    return from(this.resource.signIn({account, password, addIfNotExists, appCode}))
      .pipe(
        map((response: IUser) => {
          return response ? new User(response) : null;
        })
      );
  }
}
