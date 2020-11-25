import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

import { distinctUntilChanged, tap } from 'rxjs/operators';

import { Transport, Request } from '../../models';

@Component({
  selector: 'app-transport-typeahead',
  templateUrl: './transport-typeahead.component.html',
  styleUrls: ['./transport-typeahead.component.less']
})
export class TransportTypeaheadComponent implements OnInit, OnChanges {
  @Input() transport: Transport[];
  @Input() request: Request;
  @Input() placeholder: string;
  @Input() loading: boolean;
  @Output() select: EventEmitter<Transport>;
  @Output() clear: EventEmitter<void>;
  filteredTransport: Transport[];
  selectedTransport: Transport;
  transportForm: FormGroup;
  error: string;

  constructor(private readonly builder: FormBuilder) {
    this.select = new EventEmitter();
    this.clear = new EventEmitter<void>();
    this.transportForm = this.builder.group({
      transport: new FormControl(null)
    });
    this.filteredTransport = [];
    this.selectedTransport = null;
    this.error = null;
  }

  ngOnInit() {
    this.transportForm.controls.transport.valueChanges.pipe(
      distinctUntilChanged(),
      tap((value: any) => {
        if (value) {
          this.filteredTransport = this.transport.filter((transport: Transport) =>
            `${transport.model} ${transport.registrationNumber}`.toLowerCase().indexOf(
              (value instanceof Transport)
                ? (value as Transport).model.toLowerCase()
                : value.toLowerCase()) !== -1 ? true : false
          );
        } else {
          this.filteredTransport = this.transport;
        }
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.transport && changes.transport.currentValue) {
      this.filteredTransport = changes.transport.currentValue;
      if (this.selectedTransport) {
        const found = this.filteredTransport.find((transport: Transport) => transport.id === this.selectedTransport.id);
        if (!found) {
          this.error = 'Транспорт эксплуатируется на другой заявке';
          this.transportForm.controls.transport.setErrors({transportIsBusy: true});
        } else {
          this.error = null;
          this.transportForm.controls.transport.setErrors(null);
        }
      }
    }
    if (changes.request && changes.request.currentValue) {
      this.selectedTransport = changes.request.currentValue.transport;
      this.transportForm.controls.transport.setValue(this.selectedTransport ? this.selectedTransport : null);
    }
    if (changes.loading && changes.loading.currentValue) {
      if (changes.loading.currentValue === true) {
        this.transportForm.controls.transport.disable();
      } else if (changes.loading.currentValue === false) {
        this.transportForm.controls.transport.enable();
      }
    }
  }

  /**
   * Событие выбора транспорта
   * @param event - Событие
   */
  onSelect(event: MatAutocompleteSelectedEvent) {
    this.select.emit(event.option.value);
    this.selectedTransport = event.option.value;
    this.filteredTransport = this.transport;
  }

  /**
   * Отображение в поле ввода выбранного пользователя в меню
   * @param transport - Выбранный транспорт
   */
  display(transport: Transport): string {
    return this.selectedTransport ? this.selectedTransport.model : transport ? transport.model : '';
  }

  /**
   * Сброс выбранного транспорта
   */
  onClear() {
    this.selectedTransport = null;
    this.transportForm.controls.transport.setValue('');
    this.transportForm.controls.transport.setErrors(null);
    this.clear.emit();
  }

  /**
   * Установка текущего транспорта
   * @param transport - Текущий транспорт
   */
  setSelected(transport: Transport) {
    this.selectedTransport = transport;
    this.transportForm.controls.transport.setValue(transport ? transport : null);
  }

  /**
   * Сброс выбранного транспорта
   */
  clearSelected() {
    this.selectedTransport = null;
    this.transportForm.controls.transport.setValue('');
  }

}
