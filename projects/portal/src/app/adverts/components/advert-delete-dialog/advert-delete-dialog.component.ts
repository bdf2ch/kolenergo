import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { IApplicationState } from '../../../ngrx';
import {AdvertsDeleteAdvert, selectDeletingInProgress} from '../../ngrx';

@Component({
  selector: 'app-advert-delete-dialog',
  templateUrl: './advert-delete-dialog.component.html',
  styleUrls: ['./advert-delete-dialog.component.less']
})
export class AdvertDeleteDialogComponent implements OnInit {
  public deletingInProgress$: Observable<boolean>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialogRef: MatDialogRef<AdvertDeleteDialogComponent>) { }

  ngOnInit() {
    this.deletingInProgress$ = this.store.pipe(select(selectDeletingInProgress));
  }

  /**
   * Удаление текущего объявления
   */
  deleteAdvert() {
    this.store.dispatch(new AdvertsDeleteAdvert());
  }

  /**
   * Закрытие диалогшового окна удаления объявления
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
