import { Injectable } from '@angular/core';

import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationResource } from '../resources/authentication.resource';
import { User } from '../../models';
import { IUser } from '../../interfaces';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private resource: AuthenticationResource,
              private snackBar: MatSnackBar) {}

  signIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string): Observable<any> {
    return from(this.resource.signIn({account, password, addIfNotExists, appCode}))
      .pipe(
        map((response: IUser) => {
          return response ? new User(response) : null;
        }),
        catchError((error) => {
          console.error(error);
          switch (error.status) {
            case 401:
              this.snackBar.open('Пользователь не найден', 'Закрыть', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 5000
              });
              break;
            case 403:
              this.snackBar.open('Доступ запрещен', 'Закрыть', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 5000
              });
              break;
            default:
              this.snackBar.open('Пользователь не найден', 'Закрыть', {
                verticalPosition: 'bottom',
                horizontalPosition: 'center',
                duration: 5000
              });
              break;
          }
          return EMPTY;
        })
      );
  }
}
