import {Injectable} from '@angular/core';

import {EMPTY, from, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {AuthenticationResource} from '../resources/authentication.resource';
import {User} from '../../models';
import {IServerResponse, IUser} from '../../interfaces';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private resource: AuthenticationResource,
              private snackBar: MatSnackBar) {
  }

  /**
   * Проверка текущей сессии
   * @param appCode - Код приложения
   */
  checkSession(appCode: string): Observable<IUser> {
    return from(this.resource.check({appCode}, null, null))
      .pipe(
        map((response: IUser) => response)
      );
  }

  /**
   * Авторизация пользователя
   * @param account - Учетная запись
   * @param password - Пароль
   * @param addIfNotExists - Создать нового пользователся при успешной авторизации
   * @param appCode - Код приложения
   */
  signIn(account: string, password: string, addIfNotExists?: boolean, appCode?: string): Observable<any> {
    return from(this.resource.signIn({account, password, addIfNotExists, appCode}));
    /*
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
        throw new Error();
      })

    );
    */
  }

  signOut(): Observable<boolean> {
    return from(this.resource.signOut())
      .pipe(
        map(() => true)
      );
  }
}
