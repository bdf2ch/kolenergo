import { Component, Input, OnInit } from '@angular/core';

import { User } from '@kolenergo/core';

@Component({
  selector: 'msg-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.less']
})
export class UserAvatarComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
