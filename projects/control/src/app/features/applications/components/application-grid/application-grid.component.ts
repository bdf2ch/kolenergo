import { Component, Input, OnInit } from '@angular/core';
import { Application } from '../../../../models';

@Component({
  selector: 'app-application-grid',
  templateUrl: './application-grid.component.html',
  styleUrls: ['./application-grid.component.less']
})
export class ApplicationGridComponent implements OnInit {
  @Input() applications: Application[];

  constructor() { }

  ngOnInit() {
  }

}
