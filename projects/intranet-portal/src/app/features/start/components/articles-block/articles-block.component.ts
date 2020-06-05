import { Component, Input, OnInit } from '@angular/core';

import { EArticleBlockLayout } from '../../../../enums';

@Component({
  selector: 'app-articles-block',
  templateUrl: './articles-block.component.html',
  styleUrls: ['./articles-block.component.less']
})
export class ArticlesBlockComponent implements OnInit {
  @Input() layout: EArticleBlockLayout;
  public blockLayout = EArticleBlockLayout;

  constructor() { }

  ngOnInit() {
  }

}
