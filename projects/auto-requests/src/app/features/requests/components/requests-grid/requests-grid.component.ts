import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Request } from '../../../../models';

@Component({
  selector: 'app-requests-grid',
  templateUrl: './requests-grid.component.html',
  styleUrls: ['./requests-grid.component.less']
})
export class RequestsGridComponent implements OnInit {
  @Input() requests: Request[];
  @Output() select: EventEmitter<Request>;

  constructor() {
    this.select = new EventEmitter<Request>();
  }

  ngOnInit() {}

  /**
   * Выбор текущей заявки
   * @param request - Выбранная заявка
   */
  selectRequest(request: Request) {
    this.select.emit(request);
  }
}
