import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Application } from '../../../../models';

@Component({
  selector: 'app-application-grid',
  templateUrl: './application-grid.component.html',
  styleUrls: ['./application-grid.component.less']
})
export class ApplicationGridComponent implements OnInit {
  @Input() applications: Application[];
  @Output() select: EventEmitter<Application>;

  constructor() {
    this.select = new EventEmitter<Application>();
  }

  ngOnInit() {}

  /**
   * Выбор приложения
   * @param application
   */
  onSelect(application: Application) {
    this.select.emit(application);
  }

}
