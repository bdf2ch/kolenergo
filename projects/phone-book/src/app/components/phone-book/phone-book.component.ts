import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.component.html',
  styleUrls: ['./phone-book.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class PhoneBookComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
