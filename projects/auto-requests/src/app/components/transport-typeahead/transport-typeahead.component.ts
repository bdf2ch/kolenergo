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
  @Input() selected: Transport;
  @Output() select: EventEmitter<Transport>;
  @Output() clear: EventEmitter<void>;
  filteredTransport: Transport[];
  selectedTransport: Transport;
  transportForm: FormGroup;

  constructor(private readonly builder: FormBuilder) {
    this.select = new EventEmitter();
    this.clear = new EventEmitter<void>();
    this.transportForm = this.builder.group({
      transport: new FormControl(null)
    });
    this.filteredTransport = [];
    this.selectedTransport = null;
  }

  ngOnInit() {
    this.transportForm.controls.transport.setValue(this.request ? this.request.transport.model : null);
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
    if (changes.selected && changes.selected.currentValue) {
      this.selectedTransport = changes.selected.currentValue;
      // this.transportForm.controls.transport.setValue(changes.selected.currentValue.model);
    }
    if (changes.transport && changes.transport.currentValue) {
      this.filteredTransport = changes.transport.currentValue;
    }
    if (changes.request && changes.request.currentValue) {
      this.selectedTransport = changes.request.currentValue.transport;
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
    console.log('selected transport: ', transport);
    return transport ? transport.model : '';
  }

  /**
   * Сброс выбранного транспорта
   */
  onClear() {
    this.selectedTransport = null;
    this.transportForm.controls.transport.setValue('');
    this.clear.emit();
  }

  /**
   * Установка текцущего трансорта
   * @param transport - Текущий транспорт
   */
  setSelected(transport: Transport) {
    this.selectedTransport = transport;
    this.transportForm.controls.transport.setValue(transport ? transport.model : null);
  }

  /**
   * Сброс выбранного транспорта
   */
  clearSelected() {
    this.selectedTransport = null;
    this.transportForm.controls.transport.setValue('');
  }

}
