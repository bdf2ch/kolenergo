import {Component, OnInit} from '@angular/core';

import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {
  ApplicationModes,
  IApplicationState,
  LoadAllRequests, LoadEmployeeRequests,
  LoadExpiredRequests, LoadOwnRequests,
  selectEmployeeRequestsCount,
  selectEmployeeUncompletedRequestsCount,
  selectExpiredRequestsCount,
  selectMode,
  selectNewRequestsCount,
  selectOwnRequestsCount,
  selectOwnUncompletedRequestsCount, SetCurrentPage
} from '../../../state';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  // @Input() applicationModes: ApplicationModes;
  //@Input() public set applicationModes(value: any) {
  //  console.log(value);
  //}
  public applicationModes = ApplicationModes;
  public mode$: Observable<ApplicationModes>;
  public newRequestsCount$: Observable<number>;
  public ownRequestsCount$: Observable<number>;
  public ownUncompletedRequestsCount$: Observable<number>;
  public employeeRequestsCount$: Observable<number>;
  public employeeUncompletedRequestsCount$: Observable<number>;
  public expiredRequestsCount$: Observable<number>;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.mode$ = this.store.pipe(select(selectMode));
    this.newRequestsCount$ = this.store.pipe(select(selectNewRequestsCount));
    this.ownRequestsCount$ = this.store.pipe(select(selectOwnRequestsCount));
    this.ownUncompletedRequestsCount$ = this.store.pipe(select(selectOwnUncompletedRequestsCount));
    this.employeeRequestsCount$ = this.store.pipe(select(selectEmployeeRequestsCount));
    this.employeeUncompletedRequestsCount$ = this.store.pipe(select(selectEmployeeUncompletedRequestsCount));
    this.expiredRequestsCount$ = this.store.pipe(select(selectExpiredRequestsCount));
  }

  selectTab(mode: ApplicationModes) {
    let currentMode = null;
    this.mode$.subscribe((item: ApplicationModes) => {
      currentMode = item;
    });
    console.log('currentMode', currentMode);
    this.store.dispatch(new SetCurrentPage(0));

    switch (mode) {
      case ApplicationModes.ALL_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.ALL_REQUESTS_MODE) {
          this.store.dispatch(new LoadAllRequests());
        }
        break;
      }
      case ApplicationModes.OWN_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.OWN_REQUESTS_MODE) {
          this.store.dispatch(new LoadOwnRequests());
        }
        break;
      }
      case ApplicationModes.EMPLOYEE_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.EMPLOYEE_REQUESTS_MODE) {
          this.store.dispatch(new LoadEmployeeRequests());
        }
        break;
      }
      case ApplicationModes.EXPIRED_REQUESTS_MODE: {
        if (currentMode !== ApplicationModes.EXPIRED_REQUESTS_MODE) {
          this.store.dispatch(new LoadExpiredRequests());
        }
        break;
      }
    }
    // this.store.dispatch(new SelectRequestsMode(mode));
  }

}
