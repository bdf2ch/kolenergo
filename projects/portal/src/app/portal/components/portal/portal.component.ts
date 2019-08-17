import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import {Store} from '@ngrx/store';

import {PortalService} from '../../services/portal.service';
import {IApplicationState, LoadInitialData} from '../../../ngrx';
import {NewAdvertComponent} from '../../../adverts/components/new-advert/new-advert.component';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.less']
})
export class PortalComponent implements OnInit {

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog,
              private readonly portalService: PortalService) {}

  ngOnInit() {
    this.portalService.getInitialData().subscribe();
    this.store.dispatch(new LoadInitialData());
  }

  openAddAdvertDialog() {
    this.dialog.open(NewAdvertComponent, {
      height: '700px'
    });
  }

}
