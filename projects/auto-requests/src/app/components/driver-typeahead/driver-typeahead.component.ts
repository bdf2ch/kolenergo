import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { distinctUntilChanged, tap } from 'rxjs/operators';

import { Driver } from '../../models';

@Component({
  selector: 'app-driver-typeahead',
  templateUrl: './driver-typeahead.component.html',
  styleUrls: ['./driver-typeahead.component.less']
})
export class DriverTypeaheadComponent implements OnInit, OnChanges {

  @Input() drivers: Driver[];
  @Output() select: EventEmitter<Driver>;
  @Output() clear: EventEmitter<void>;
  filteredDrivers: Driver[];
  selectedDriver: Driver;
  driverForm: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    this.select = new EventEmitter();
    this.clear = new EventEmitter<void>();
    this.filteredDrivers = [];
    this.selectedDriver = null;
    this.driverForm = this.builder.group({
      driver: new FormControl(null)
    });
  }

  ngOnInit() {
    this.driverForm.controls.driver.valueChanges.pipe(
      distinctUntilChanged(),
      tap((value: any) => {
        if (value) {
          this.filteredDrivers = this.drivers.filter((driver: Driver) =>
            `${driver.firstName} ${driver.lastName}`.toLowerCase().indexOf(value) !== -1 ? true : false
          );
        } else {
          this.filteredDrivers = this.drivers;
        }
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.drivers.currentValue) {
      this.filteredDrivers = changes.drivers.currentValue;
    }
  }

  /**
   * Событие выбора водителя
   * @param event - Событие
   */
  onSelect(event: MatAutocompleteSelectedEvent) {
    this.select.emit(event.option.value);
    this.selectedDriver = event.option.value;
    this.filteredDrivers = this.drivers;
  }

  /**
   * Отображение в поле ввода выбранного водителя
   * @param driver - Выбраный водитель
   */
  display(driver: Driver): string {
    return driver ? `${driver.firstName} ${driver.lastName}` : '';
  }

  /**
   * Сброс выбранного водителя
   */
  onClear() {
    this.selectedDriver = null;
    this.driverForm.controls.driver.setValue('');
    this.clear.emit();
  }
}
