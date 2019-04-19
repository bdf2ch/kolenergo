import { Component, OnInit } from '@angular/core';
import {MatSelectChange, MatSelectionListChange} from '@angular/material';


import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AhoRequest, AhoRequestStatus } from '../../models';
import { IApplicationState, selectCurrentUser, selectEmployees, selectRequestStatuses, selectSelectedRequest } from '../../../state';
import { IAhoRequest } from '../../interfaces';
import { IUser, User } from 'kolenergo-core';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class RequestDetailsComponent implements OnInit {
  public user$: Observable<User>;
  public statuses$: Observable<AhoRequestStatus[]>;
  public employees$: Observable<User[]>;
  public selectedRequest$: Observable<IAhoRequest>;
  public inAddEmployeeMode: boolean;
  public isRequestChanged: boolean;

  constructor(private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectCurrentUser));
    this.statuses$ = this.store.pipe(select(selectRequestStatuses));
    this.employees$ = this.store.pipe(select(selectEmployees));
    this.selectedRequest$ = this.store.pipe(select(selectSelectedRequest));
    this.inAddEmployeeMode = false;
    this.isRequestChanged = false;
  }

  addEmployeeMode() {
    this.inAddEmployeeMode = !this.inAddEmployeeMode;
  }

  selectEmployee(event: MatSelectChange) {
    let request: AhoRequest = null;
    this.selectedRequest$.subscribe((selectedRequest: AhoRequest) => {
      request = selectedRequest;
    });
    request.employees.push(event.value);
    this.addEmployeeMode();
    this.isRequestChanged = true;
  }

  removeEmployee(employee: IUser) {
    let request: AhoRequest = null;
    this.selectedRequest$.subscribe((selectedRequest: AhoRequest) => {
      request = selectedRequest;
    });
    request.employees = request.employees.filter((item: IUser) => {
      return item.id !== employee.id;
    });
    this.isRequestChanged = true;
  }

  checkTask(event: MatSelectionListChange) {
    this.isRequestChanged = true;
  }
}
