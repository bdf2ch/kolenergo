import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SignInComponent, User } from '@kolenergo/core';
import {
  IApplicationState,
  PhoneBookHideSidebarToggleButton,
  selectApplicationMode,
  selectApplicationViewMode,
  selectCurrentUser,
  selectShowSidebarToggleButton
} from '../../ngrx';
import { EApplicationMode, EViewMode } from '../../enums';

@Component({
  selector: 'app-controls',
  templateUrl: './app-controls.component.html',
  styleUrls: ['./app-controls.component.less']
})
export class AppControlsComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public currentUser$: Observable<User>;
  public viewMode$: Observable<EViewMode>;
  public applicationMode$: Observable<EApplicationMode>;
  public showSidebarToggleButton$: Observable<boolean>;
  public views = EViewMode;
  public modes = EApplicationMode;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
    this.viewMode$ = this.store.pipe(select(selectApplicationViewMode));
    this.applicationMode$ = this.store.pipe(select(selectApplicationMode));
    this.showSidebarToggleButton$ = this.store.pipe(select(selectShowSidebarToggleButton));
  }

  openSidenav() {
    this.sidenav.open().then(() => {
      this.store.dispatch(new PhoneBookHideSidebarToggleButton());
    });
  }

  /**
   * Открытие диалогового окна авторизации пользователя
   */
  openSignInDialog() {
    this.dialog.open(SignInComponent, {
      id: 'sign-in-dialog',
      width: '350px',
      panelClass: 'sign-in-dialog'
    });
  }
}
