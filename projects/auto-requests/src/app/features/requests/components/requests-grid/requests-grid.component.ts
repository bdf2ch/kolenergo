import { Component, Input, OnInit } from '@angular/core';

import { Request } from '../../../../models';

@Component({
  selector: 'app-requests-grid',
  templateUrl: './requests-grid.component.html',
  styleUrls: ['./requests-grid.component.less']
})
export class RequestsGridComponent implements OnInit {
  @Input() requests: Request[];

  constructor() { }

  ngOnInit() {
  }

}
