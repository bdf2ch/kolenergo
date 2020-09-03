import { Injectable } from '@angular/core';

import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IServerResponse, IUser } from '../../../../interfaces';
import { User } from '../../../../models/user.model';
import { UserSearchResource } from '../resources/user-search.resource';



@Injectable({
  providedIn: 'root'
})
export class UserSearchService {

  constructor(private resource: UserSearchResource) {}

  /**
   * Поиск пользователей
   * @param query - Условие поиска
   * @param withCompanyDetails - Включать ли в ответ данные об организации пользователя
   * @param withDepartmentDetails - Включать ли в ответ данные об структурном подразделении организации пользователя
   * @param companyId - Идентификатор организации
   */
  searchUsers(query: string, withCompanyDetails: boolean, withDepartmentDetails: boolean, companyId: number): Observable<User[]> {
    return from(this.resource.searchUsers(null, {query, withCompany: withCompanyDetails, withDepartment: withDepartmentDetails, companyId}))
      .pipe(
        map((response: IServerResponse<IUser[]>) => {
          return response.data.map((item: IUser) => {
            return new User(item);
          });
        })
      );
  }
}
