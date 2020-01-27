import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.less']
})
export class IndicatorComponent implements OnInit {
  @Input() value: number|string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {}

}
