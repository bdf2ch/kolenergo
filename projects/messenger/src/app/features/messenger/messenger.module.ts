import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatSnackBarModule, MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { SearchWithFiltersModule } from '@kolenergo/core';
import { MessengerRoutingModule } from './messenger-routing.module';
import { MessengerWrapperComponent } from './components/messenger-wrapper/messenger-wrapper.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { MessengerEffects, reducer } from './ngrx';
import { environment } from '../../../environments/environment';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { ChatSearchComponent } from './components/chat-search/chat-search.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { CurrentChatHeaderComponent } from './components/current-chat-header/current-chat-header.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';

@NgModule({
  declarations: [
    MessengerWrapperComponent,
    MessengerComponent,
    ChatListComponent,
    MessageListComponent,
    ChatSearchComponent,
    CurrentUserComponent,
    CurrentChatHeaderComponent,
    MessageInputComponent,
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    MessengerRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    StoreModule.forFeature('messenger', reducer),
    EffectsModule.forFeature([MessengerEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    SearchWithFiltersModule
  ]
})
export class MessengerModule { }
