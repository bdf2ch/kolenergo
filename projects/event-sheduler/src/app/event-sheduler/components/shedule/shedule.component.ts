import {AfterContentInit, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as state from '../../../ngrx';
import {take} from 'rxjs/operators';
import {IApplicationState} from '../../../ngrx';
import {ECalendarModes} from '../../enums';
import {MatDialog} from '@angular/material';
import {RequestAddDialogComponent} from '../request-add-dialog/request-add-dialog.component';
import {Company} from '@kolenergo/core';

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.less'],
  styles: [':host { display: flex; flex-direction: column; flex: 1; }']
})
export class SheduleComponent implements OnInit {
  public date$: Observable<Date>;
  public mode$: Observable<ECalendarModes>;
  public companies$: Observable<Company[]>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialog: MatDialog) { }

  ngOnInit() {
    this.date$ = this.store.pipe(
      select(state.selectDate),
      take(1)
    );
    this.mode$ = this.store.pipe(
      select(state.selectCalendarMode)
    );
    this.companies$ = this.store.pipe(
      select(state.selectCompanies)
    );
  }


  openAddDialog() {
    this.dialog.open(
      RequestAddDialogComponent,
      {
        width: '800px',
        panelClass: 'add-request-dialog',
      });
  }
}
