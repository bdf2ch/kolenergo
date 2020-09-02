import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FilterManager } from '@kolenergo/core';
import { Request } from '../../../../models';
import { EListMode } from '../../../../enums';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent implements OnInit {
  @Input() listMode: EListMode;
  @Input() requests: Request[];
  @Input() userRequests: Request[];
  @Input() filteredRequests: Request[];
  @Input() filters: FilterManager;
  @Input() search: string;
  @Output() select: EventEmitter<EListMode>;
  @Output() export: EventEmitter<void>;
  listModes = EListMode;

  constructor() {
    this.select = new EventEmitter<EListMode>();
    this.export = new EventEmitter<void>();
  }

  ngOnInit() {}

  /**
   * Выбор отображения списка заявок
   * @param mode - Режим отображения списка заявок
   */
  selectTab(mode: EListMode) {
    this.select.emit(mode);
  }

  /**
   * Экспорт заявок
   */
  exportRequests() {
    this.export.emit();
  }
}
