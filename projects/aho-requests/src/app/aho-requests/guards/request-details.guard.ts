import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AhoRequest } from '../models';
import {
  IApplicationState,
  LoadRequestDetails,
  SelectRequest,
  selectRequests,
  selectSelectedRequest
} from '../../state';
import { AhoRequestsService } from '../services/aho-requests.service';
import { IAhoRequest } from '../interfaces';
import { filter, take } from 'rxjs/operators';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class RequestDetailsGuard implements Resolve<IAhoRequest> {
  private requests$: Observable<IAhoRequest[]>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly aho: AhoRequestsService) {
    this.requests$ = this.store.pipe(select(selectRequests));
  }

  waitForDataToLoad(): Observable<IAhoRequest> {
    return this.store.pipe(select(selectSelectedRequest))
      .pipe(
        filter(request => request instanceof AhoRequest)
      );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAhoRequest> {
    const requestId = parseInt(route.params.id, 0);
    let request = null;
    this.requests$.subscribe((requests: IAhoRequest[]) => {
      const findRequestById = (item: IAhoRequest) => item.id === requestId;
      request = requests.find(findRequestById);
    });

    if (!request) {
      this.store.dispatch(new LoadRequestDetails(requestId));
      return this.waitForDataToLoad()
        .pipe(
          switchMap(req => of(req)),
          take(1)
        );
    } else {
      this.store.dispatch(new SelectRequest(request));
      return of(request);
    }
  }
}
