import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map} from 'rxjs/operators';

import { AuthenticationResource } from '../resources/authentication.resource';
import { IServerResponse, IUser } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private resource: AuthenticationResource) {}

  /**
   * Проверка текущей сессии
   * @param appCode - Код приложения
   */
  checkSession(appCode: string): Observable<IServerResponse<IUser>> {
    return from(this.resource.check({appCode}, null, null))
      .pipe(
        map((response: IServerResponse<IUser>) => response)
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
  }

  /**
   * Завершение сессии пользователя
   */
  signOut(): Observable<boolean> {
    return from(this.resource.signOut())
      .pipe(
        map(() => true)
      );
  }
}
