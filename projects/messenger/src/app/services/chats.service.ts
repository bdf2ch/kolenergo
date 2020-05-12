import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';

import { IServerResponse } from '@kolenergo/core';
import { IMessage } from '../interfaces';
import { Chat } from '../models';
import { IApplicationState } from '../ngrx/application.state';
import {LoadChatSuccess, MessengerActionTypes} from '../features/messenger/ngrx/messenger.actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(
    private readonly store: Store<IApplicationState>,
    private readonly socket: Socket
  ) {
    this.socket.fromEvent(MessengerActionTypes.LOAD_CHAT_SUCCESS)
      .subscribe((value: IServerResponse<IMessage[]>) =>  {
        console.log('chat messages', value);
        this.store.dispatch(new LoadChatSuccess(value));
      });
  }

  load(chat: Chat, startMessageId: number = 0) {
    console.log('service load chat');
    this.socket.emit(MessengerActionTypes.LOAD_CHAT, {chat, startMessageId, messageCount: environment.messageCount});
  }

}
