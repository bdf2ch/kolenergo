import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { distinctUntilChanged, tap } from 'rxjs/operators';

import {Driver, Request, Transport} from '../../models';

@Component({
  selector: 'app-driver-typeahead',
  templateUrl: './driver-typeahead.component.html',
  styleUrls: ['./driver-typeahead.component.less']
})
export class DriverTypeaheadComponent implements OnInit, OnChanges {
  @Input() drivers: Driver[];
  @Input() request: Request;
  @Output() select: EventEmitter<Driver>;
  @Output() clear: EventEmitter<void>;
  filteredDrivers: Driver[];
  selectedDriver: Driver;
  driverForm: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    this.driverForm = this.builder.group({
      driver: new FormControl(null)
    });
    this.select = new EventEmitter();
    this.clear = new EventEmitter<void>();
    this.filteredDrivers = [];
    this.selectedDriver = null;
  }

  ngOnInit() {
    /*
    this.driverForm = this.builder.group({
      driver: new FormControl(this.request ? this.request.driver : null)
    });
    */
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
    if (changes.drivers && changes.drivers.currentValue) {
      this.filteredDrivers = changes.drivers.currentValue;
    }
    if (changes.request && changes.request.currentValue) {
      this.selectedDriver = changes.request.currentValue.driver;
      this.driverForm.controls.driver.setValue(this.selectedDriver ? this.selectedDriver : null);
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
    return this.selectedDriver
      ? `${this.selectedDriver.firstName} ${this.selectedDriver.lastName}`
      : driver
        ? `${driver.firstName} ${driver.lastName}`
        : '';
  }

  /**
   * Сброс выбранного водителя
   */
  onClear() {
    this.selectedDriver = null;
    this.driverForm.controls.driver.setValue('');
    this.clear.emit();
  }

  /**
   * Сброс выбранного водителя
   */
  clearSelected() {
    this.selectedDriver = null;
    this.driverForm.controls.driver.setValue('');
  }

  /**
   * Установка текущего водителя
   * @param driver - Текущий водитель
   */
  setSelected(driver: Driver) {
    this.selectedDriver = driver;
    this.driverForm.controls.driver.setValue(driver ? driver : null);
  }
}
