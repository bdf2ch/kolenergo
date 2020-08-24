import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {RoutePoint} from '../../../../models';

@Component({
  selector: 'app-route-path',
  templateUrl: './route-path.component.html',
  styleUrls: ['./route-path.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePathComponent implements OnInit {
  @Input() routes: RoutePoint[] | string[];
  @Input() extended: boolean;

  constructor() {}

  ngOnInit() {}

  /**
   * Перемещение элемента маршрута вверх
   * @param index - Индекс перемещаемого элемента
   */
  moveUp(index: number) {
    const previous = this.routes[index - 1];
    this.routes[index - 1] = this.routes[index];
    this.routes[index] = previous;
  }

  /**
   * Перемещение элемента маршрута вниз
   * @param index - Индекс перемещаемого элемента
   */
  moveDown(index: number) {
    const next = this.routes[index + 1];
    this.routes[index + 1] = this.routes[index];
    this.routes[index] = next;
  }

  /**
   * Удаление элемента маршрута
   * @param index - Индекс удаляемого элемента
   */
  remove(index: number) {
    this.routes.splice(index, 1);
  }
}
