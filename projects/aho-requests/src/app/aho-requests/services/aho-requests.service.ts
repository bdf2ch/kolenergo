import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AhoRequestsResource } from '../resources/aho-requests.resource';
import { IAhoRequest, IAhoRequestsInitialData } from '../interfaces';
import { IApplicationState, selectItemsOnPage } from '../../state';
import { IServerResponse } from 'kolenergo-core';



@Injectable({
  providedIn: 'root'
})
export class AhoRequestsService {
  private itemsOnPage$: Observable<number>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly resource: AhoRequestsResource) {
    this.itemsOnPage$ = this.store.pipe(select(selectItemsOnPage));
  }

  /**
   * Получение данных для инициали
   */
  fetchInitialData(userId: number): Observable<IServerResponse<IAhoRequestsInitialData>> {
    let items = null;
    this.itemsOnPage$.subscribe((itemsOnPageCount: number) => {
      items = itemsOnPageCount;
    });
    return from(this.resource.getInitialData({userId, itemsOnPage: items}))
      .pipe(
        map((response: IServerResponse<IAhoRequestsInitialData>) => response)
      );
  }

  /**
   * Получение информации о заявках
   * @param start - Начало периода
   * @param end - Окончание апериода
   * @param userId - Идентификатор пользователя
   * @param employeeId - Идентфиикатор исполнителя
   * @param requestTypeId - Идентификатор типа заявки
   * @param requestStatusId - Идентификатор статуса заявки
   * @param onlyExpired - Только просроченные заявки
   * @param page - Страница
   * @param itemsOnPage - Заявок на странице
   * @param search - Строка поиска
   */
  fetchRequests(
    start: number,
    end: number,
    userId: number,
    employeeId: number,
    requestTypeId: number,
    requestStatusId: number,
    onlyExpired: boolean,
    page: number,
    itemsOnPage: number,
    search?: string
  ): Observable<IServerResponse<{requests: IAhoRequest[], totalRequests: number}>> {
    return from(this.resource.getRequests(
      null,
      { start, end, userId, employeeId, requestTypeId, requestStatusId, onlyExpired, page, itemsOnPage},
      null
    ))
      .pipe(
        map((response: IServerResponse<{requests: IAhoRequest[], totalRequests: number}>) => response)
      );
  }

  /**
   * Получение информации о заявке АХО по идентификатору
   * @param requestId - Идкнтификатор заявки
   */
  fetchRequestById(requestId: number): Observable<IAhoRequest> {
    return from(this.resource.getRequestById({id: requestId}))
      .pipe(
        map((response: IAhoRequest) => response)
      );
  }
}
