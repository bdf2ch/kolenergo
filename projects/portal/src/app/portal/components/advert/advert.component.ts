import { Component, Input, OnInit } from '@angular/core';

import { Advert } from '../../../adverts/models';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.less']
})
export class AdvertComponent implements OnInit {
  @Input() advert: Advert;
  @Input() zoomOnHover: boolean;

  constructor() {}

  ngOnInit() {}

}
