import { Component, Input, OnInit } from '@angular/core';

import { Chat } from '../../../../models';

@Component({
  selector: 'msg-current-chat-header',
  templateUrl: './current-chat-header.component.html',
  styleUrls: ['./current-chat-header.component.less']
})
export class CurrentChatHeaderComponent implements OnInit {
  @Input() chat: Chat;

  constructor() { }

  ngOnInit() {
  }

}
