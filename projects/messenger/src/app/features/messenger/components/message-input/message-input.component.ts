import { Component, Input, OnInit } from '@angular/core';

import { User } from '@kolenergo/core';

@Component({
  selector: 'msg-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.less']
})
export class MessageInputComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
