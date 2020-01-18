import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApplicationState, selectApplicationViewMode } from '../../../ngrx';
import { EViewMode } from '../../../enums';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  public viewMode$: Observable<EViewMode>;
  public views = EViewMode;

  constructor(private readonly store: Store<IApplicationState>) { }

  ngOnInit() {
    this.viewMode$ = this.store.pipe(select(selectApplicationViewMode));
  }

}
