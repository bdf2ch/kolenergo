import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@kolenergo/core';
import {
  ApplicationOpenAddRequestDialog,
  ApplicationOpenSignInDialog,
  ApplicationSelectViewMode,
  IApplicationState,
  selectIsLoading,
  selectUser,
  selectViewMode
} from './ngrx';
import { EViewMode } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  idLoading$: Observable<boolean>;
  user$: Observable<IUser>;
  viewMode$: Observable<EViewMode>;
  viewModes = EViewMode;
  date: Date;

  constructor(private readonly store: Store<IApplicationState>) {
    this.date = new Date();
    this.idLoading$ = this.store.pipe(select(selectIsLoading));
    this.user$ = this.store.pipe(select(selectUser));
    this.viewMode$ = this.store.pipe(select(selectViewMode));
  }

  /**
   * Выбор режима отображения заявок
   * @param mode - Режим отображения
   */
  selectViewMode(mode: EViewMode) {
    this.store.dispatch(new ApplicationSelectViewMode(mode));
  }

  /**
   * Открытие диалогового окна авторизации пользователя
   */
  openSignInDialog() {
    this.store.dispatch(new ApplicationOpenSignInDialog(false));
  }

  /**
   * Открытие диалогового окна добавления новой заявки
   */
  openAddRequestDialog() {
    this.store.dispatch(new ApplicationOpenAddRequestDialog());
  }
}
