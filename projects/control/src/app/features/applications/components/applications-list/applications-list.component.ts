import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, selectApplications } from '../../../../ngrx';
import { Application } from '../../../../models';
import { ApplicationsSelectApplication } from '../../ngrx';

@Component({
  selector: 'app-application-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.less']
})
export class ApplicationsListComponent implements OnInit {
  applications$: Observable<Application[]>;

  constructor(private readonly store: Store<IApplicationState>) {
    this.applications$ = this.store.pipe(select(selectApplications));
  }

  ngOnInit() {}

  /**
   * Выбор приложения
   * @param application - Текущее приложение
   */
  onSelectApplication(application: Application) {
    this.store.dispatch(new ApplicationsSelectApplication(application));
  }
}
