import { Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {ApplicationSelectViewMode, IApplicationState, selectViewMode} from './ngrx';
import { EViewMode } from './enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  viewMode$: Observable<EViewMode>;
  viewModes = EViewMode;
  date: Date;

  constructor(private readonly store: Store<IApplicationState>) {
    this.date = new Date();
    this.viewMode$ = this.store.pipe(select(selectViewMode));
  }

  /**
   * Выбор режима отображения заявок
   * @param mode - Режим отображения
   */
  selectViewMode(mode: EViewMode) {
    this.store.dispatch(new ApplicationSelectViewMode(mode));
  }
}
