import { Component, Input, OnInit } from '@angular/core';

import { WeatherSummary } from '../../../../models';

@Component({
  selector: 'app-weather-summary',
  templateUrl: './weather-summary.component.html',
  styleUrls: ['./weather-summary.component.less']
})
export class WeatherSummaryComponent implements OnInit {
  @Input() weatherSummary: WeatherSummary;
  constructor() { }

  ngOnInit() {
  }

}
