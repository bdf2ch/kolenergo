import { Component, Input, OnInit } from '@angular/core';

import { MenuItem } from '../../models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  @Input() items: MenuItem[];

  constructor() { }

  ngOnInit() {}

}
