import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState } from '../../../../ngrx';
import { Application } from '../../../../models';
import {ApplicationsSelectApplication, selectApplications} from '../../ngrx';
import {NewApplicationDialogComponent} from '../new-application-dialog/new-application-dialog.component';


@Component({
  selector: 'app-application-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.less']
})
export class ApplicationsListComponent implements OnInit {
  applications$: Observable<Application[]>;

  constructor(
    private readonly dialog: MatDialog,
    private readonly store: Store<IApplicationState>
  ) {
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

  openNewApplicationDialog() {
    this.dialog.open(NewApplicationDialogComponent, {
      id: 'add-application-dialog',
      width: '800px',
      height: '500px',
      panelClass: 'tiny-dialog',
      data: {
        color: '#c5cae9',
        icon: 'widgets',
        title: 'Новое приложение',
        titleColor: '#4527a0'
      }
    });
  }
}
