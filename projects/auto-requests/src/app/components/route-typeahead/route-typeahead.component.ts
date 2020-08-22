import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { distinctUntilChanged, tap } from 'rxjs/operators';

import { RoutePoint } from '../../models';

@Component({
  selector: 'app-route-typeahead',
  templateUrl: './route-typeahead.component.html',
  styleUrls: ['./route-typeahead.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteTypeaheadComponent implements OnInit, OnChanges {
  @Input() routes: RoutePoint[];
  @Output() select: EventEmitter<RoutePoint>;
  filteredRoutes: RoutePoint[];
  routeForm: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    this.select = new EventEmitter();
    this.filteredRoutes = [];
    this.routeForm = this.builder.group({
      route: new FormControl(null)
    });
  }

  ngOnInit() {
    this.routeForm.controls.route.valueChanges.pipe(
      distinctUntilChanged(),
      tap((value: any) => {
        if (value) {
          this.filteredRoutes = this.routes.filter((route: RoutePoint) =>
            route.title.toLowerCase().indexOf(
              (value instanceof RoutePoint)
                ? (value as RoutePoint).title.toLowerCase()
                : value.toLowerCase()) !== -1 ? true : false
          );
        } else {
          this.filteredRoutes = this.routes;
        }
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.routes.currentValue) {
      this.filteredRoutes = changes.routes.currentValue;
    }
  }

  /**
   * Событие выбора пункта меню
   * @param event - Событие
   */
  onSelect(event: MatAutocompleteSelectedEvent) {
    this.select.emit(event.option.value);
    this.filteredRoutes = this.routes;
  }

  /**
   * Ввоод элемнта маршрута
   * @param route - Наименование элемента маршрута
   */
  enterRoute(route: string) {
    if (route !== '') {
      const newRoute = new RoutePoint();
      newRoute.title = route;
      this.select.emit(newRoute);
      this.routeForm.controls.route.setValue(null);
    }
  }

  /**
   * Отображение в поле ввода выбранного в меню элемента маршрута
   */
  display(): string {
    return null;
  }
}
