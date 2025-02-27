import { Component, OnInit } from '@angular/core';

import {EArticleBlockLayout, EViewMode} from '../../../../enums';
import {Observable} from 'rxjs';
import {IApplicationState} from '../../../../ngrx';
import {select, Store} from '@ngrx/store';
import {selectIsSidebarOpened, selectViewMode} from '../../../portal/ngrx';


@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.less']
})
export class StartComponent implements OnInit {
  public articlesLayout = EArticleBlockLayout;
  public viewMode$: Observable<EViewMode>;
  public sideBarOpened$: Observable<boolean>;


  constructor(private readonly store: Store<IApplicationState>) {
    this.viewMode$ = this.store.pipe(select(selectViewMode));
    this.sideBarOpened$ = this.store.pipe(select(selectIsSidebarOpened));
  }

  ngOnInit() {
  }

}
