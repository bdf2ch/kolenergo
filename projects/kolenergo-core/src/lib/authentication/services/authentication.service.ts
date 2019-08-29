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
   */
  checkSession(): Observable<IServerResponse<IUser>> {
    return from(this.resource.check({appCode: this.resource.appCode ? this.resource.appCode: null}, null, null))
      .pipe(
        map((response: IServerResponse<IUser>) => response)
      );
  }

  /**
   * Авторизация пользователя
   * @param account - Учетная запись
   * @param password - Пароль
   * @param addIfNotExists - Создать нового пользователся при успешной авторизации
   */
  signIn(account: string, password: string, addIfNotExists?: boolean): Observable<any> {
    return from(this.resource.signIn({account, password, addIfNotExists, appCode: this.resource.appCode ? this.resource.appCode : null}));
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
