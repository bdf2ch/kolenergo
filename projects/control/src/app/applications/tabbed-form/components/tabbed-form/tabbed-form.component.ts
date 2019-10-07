import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormTabComponent } from '../form-tab/form-tab.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'kol-tabbed-form',
  templateUrl: './tabbed-form.component.html',
  styleUrls: ['./tabbed-form.component.less']
})
export class TabbedFormComponent implements OnInit {
  @Input() caption: string;
  @Input() controlText: string;
  @Input() controlIcon: string;
  @Input() controlDisabled: boolean;
  @Input() controlLoading: boolean;
  @Output() controlAction: EventEmitter<any>;
  public tabs: FormTabComponent[];

  constructor() {
    this.tabs = [];
    this.controlAction = new EventEmitter();
  }

  ngOnInit() {
    if (this.tabs.length > 0) {
      this.tabs[0].isActive = true;
    }
  }

  /**
   * Выбор текущей вкладки
   * @param tab - Текущая вкладка
   */
  selectTab(tab: FormTabComponent) {
    this.tabs.forEach((item: FormTabComponent) => {
      item.isActive = tab.id === item.id ? true : false;
    });
  }

  /**
   * Обработчик формы
   * @param data - Данные, предающиеся обработчику
   */
  formAction(data?: any) {
    this.controlAction.emit(data);
  }
}
