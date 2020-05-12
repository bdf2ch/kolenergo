import { Component, Input, OnInit } from '@angular/core';

import { Chat } from '../../../../models';
import {MessengerService} from '../../../../services/messenger.service';

@Component({
  selector: 'msg-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.less']
})
export class MessageListComponent implements OnInit {
  @Input() chat: Chat;

  constructor(private messenger: MessengerService) {}

  ngOnInit() {
  }

}
