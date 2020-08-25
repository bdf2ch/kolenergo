import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Request } from '../../../../models';
import { EListMode } from '../../../../enums';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  @Input() listMode: EListMode;
  @Input() userRequests: Request[];
  @Input() filteredRequests: Request[];
  @Output() select: EventEmitter<EListMode>;
  listModes = EListMode;

  constructor() {
    this.select = new EventEmitter<EListMode>();
  }

  ngOnInit() {}

  /**
   * Выбор отображения списка заявок
   * @param mode - Режим отображения списка заявок
   */
  selectTab(mode: EListMode) {
    this.select.emit(mode);
  }

}
