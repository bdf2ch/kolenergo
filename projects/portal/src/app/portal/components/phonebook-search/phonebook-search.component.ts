import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phonebook-search',
  templateUrl: './phonebook-search.component.html',
  styleUrls: ['./phonebook-search.component.less']
})
export class PhonebookSearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  /**
   * Открытие новой вкладки с телефонным справочником
   * @param query - Строка поиска в справочнике
   */
  openPhoneBook(query: string) {
    if (query.length > 0) {
      window.open(`http://10.50.0.153:4444?search=${query}`, '_blank');
    }
  }
}
