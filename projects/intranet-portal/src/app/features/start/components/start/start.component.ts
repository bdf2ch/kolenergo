import { Component, OnInit } from '@angular/core';

import { EArticleBlockLayout } from '../../../../enums';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  public articlesLayout = EArticleBlockLayout;

  constructor() { }

  ngOnInit() {
  }

}
