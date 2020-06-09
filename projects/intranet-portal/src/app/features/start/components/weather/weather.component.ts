import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.less']
})
export class WeatherComponent implements OnInit {
  @Input() location: string;
  @Input() temperature: string;
  @Input() precipitations: string;
  @Input() wind: string;

  constructor() { }

  ngOnInit() {
  }

}
