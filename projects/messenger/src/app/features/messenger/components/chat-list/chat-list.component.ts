import { Component, Input, OnInit } from '@angular/core';

import {select, Store} from '@ngrx/store';

import { Chat } from '../../../../models';
import { IApplicationState } from '../../../../ngrx';
import {SelectChat, selectSelectedChat} from '../../ngrx';
import {Observable} from "rxjs";

@Component({
  selector: 'msg-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.less']
})
export class ChatListComponent implements OnInit {
  @Input() chats: Chat[];
  @Input() searchQuery: string;
  public selectedChat$: Observable<Chat>;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.selectedChat$ = this.store.pipe(select(selectSelectedChat));
  }

  /**
   * Выбор текущей беседы
   * @param chat - Текущая беседа
   */
  selectChat(chat: Chat) {
    this.store.dispatch(new SelectChat(chat));
  }
}
