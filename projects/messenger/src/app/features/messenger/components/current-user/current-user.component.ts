import { Component, Input, OnInit } from '@angular/core';

import { User } from '@kolenergo/core';

@Component({
  selector: 'msg-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.less']
})
export class CurrentUserComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}
}
