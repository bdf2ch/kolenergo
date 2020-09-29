import {
  ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges
} from '@angular/core';

import { RoutePoint } from '../../../../models';

@Component({
  selector: 'app-route-path',
  templateUrl: './route-path.component.html',
  styleUrls: ['./route-path.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoutePathComponent implements OnInit, OnChanges {
  @Input() routes: RoutePoint[];
  @Input() extended: boolean;
  @Output() remove: EventEmitter<number>;

  constructor(private readonly root: ElementRef) {
    this.remove = new EventEmitter<number>();
  }

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
  removeRoute(index: number) {
    this.routes.splice(index, 1);
    this.remove.emit(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.extended && changes.extended.currentValue !== undefined) {
      if (this.root.nativeElement) {
        this.root.nativeElement.style.height = changes.extended.currentValue === true ? 'auto' : '100%';
      }
    }
  }
}
