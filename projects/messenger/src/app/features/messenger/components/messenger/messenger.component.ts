import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { User } from '@kolenergo/core';
import { Chat } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import {
  LoadInitialData,
  SearchChatQueryChanged,
  SearchChatQueryCleared,
  selectChats,
  selectFilteredChats,
  selectSearchChatQuery,
  selectSelectedChat,
  selectUser
} from '../../ngrx';


@Component({
  selector: 'msg-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.less']
})
export class MessengerComponent implements OnInit {
  public user$: Observable<User>;
  public chats$: Observable<Chat[]>;
  public filteredChats$: Observable<Chat[]>;
  public chatSearchQuery$: Observable<string>;
  public selectedChat$: Observable<Chat>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.user$ = this.store.pipe(select(selectUser));
    this.chats$ = this.store.pipe(select(selectChats));
    this.filteredChats$ = this.store.pipe(select(selectFilteredChats));
    this.chatSearchQuery$ = this.store.pipe(select(selectSearchChatQuery));
    this.selectedChat$ = this.store.pipe(select(selectSelectedChat));
    this.store.dispatch(new LoadInitialData());
  }

  chatSearchChanged(query: string) {
    this.store.dispatch(new SearchChatQueryChanged(query));
  }

  chatSearchCleared() {
    this.store.dispatch(new SearchChatQueryCleared());
  }
}
