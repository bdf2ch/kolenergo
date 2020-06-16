import { Component, Input, OnInit } from '@angular/core';

import { EArticleBlockLayout, EViewMode } from '../../../../enums';

@Component({
  selector: 'app-articles-block',
  templateUrl: './articles-block.component.html',
  styleUrls: ['./articles-block.component.less']
})
export class ArticlesBlockComponent implements OnInit {
  @Input() layout: EArticleBlockLayout;
  @Input() viewMode: EViewMode;
  @Input() sideBarOpened: boolean;
  public blockLayout = EArticleBlockLayout;
  public view = EViewMode;

  constructor() { }

  ngOnInit() {
  }

}
