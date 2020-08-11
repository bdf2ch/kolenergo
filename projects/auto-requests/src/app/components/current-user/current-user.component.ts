import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthenticationSignOut, IUser } from '@kolenergo/core';
import { IApplicationState } from '../../ngrx';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.less']
})
export class CurrentUserComponent implements OnInit {
  @Input() user: IUser;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {}

  /**
   * Завершение сессии пользователя
   */
  signOut() {
    this.store.dispatch(new AuthenticationSignOut());
  }

}
