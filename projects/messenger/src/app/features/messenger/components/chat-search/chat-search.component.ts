import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'msg-chat-search',
  templateUrl: './chat-search.component.html',
  styleUrls: ['./chat-search.component.less']
})
export class ChatSearchComponent implements OnInit {
  @Input() query: string;
  @Output() searchChange: EventEmitter<string>;
  @Output() searchClear: EventEmitter<void>;
  @ViewChild('search') search: ElementRef;

  constructor() {
    this.searchChange = new EventEmitter();
    this.searchClear = new EventEmitter();
  }

  ngOnInit() {}

  searchChanged(query: string) {
    this.searchChange.emit(query);
  }

  searchCleared() {
    this.search.nativeElement.value = '';
    this.searchClear.emit();
  }

}
