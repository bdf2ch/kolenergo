import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '@kolenergo/core';
import { IApplicationState, selectCurrentUser } from '../../../../ngrx';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  styles: [':host { height: 100% }']
})
export class AccountComponent implements OnInit {
  public currentUser$: Observable<User>;

  constructor(private readonly store: Store<IApplicationState>) {}

  ngOnInit() {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

}
