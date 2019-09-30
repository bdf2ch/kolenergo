import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Advert } from '../../models';
import { IApplicationState } from '../../../ngrx';
import { AdvertsDeleteAdvert, selectDeletingInProgress, selectSelectedAdvert } from '../../ngrx';

@Component({
  selector: 'app-advert-delete-dialog',
  templateUrl: './advert-delete-dialog.component.html',
  styleUrls: ['./advert-delete-dialog.component.less']
})
export class AdvertDeleteDialogComponent implements OnInit {
  public selectedAdvert$: Observable<Advert>;
  public selectedAdvert: Advert;
  public deletingInProgress$: Observable<boolean>;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly dialogRef: MatDialogRef<AdvertDeleteDialogComponent>) { }

  ngOnInit() {
    this.selectedAdvert$ = this.store.pipe(select(selectSelectedAdvert));
    this.deletingInProgress$ = this.store.pipe(select(selectDeletingInProgress));
    this.selectedAdvert$.subscribe((value: Advert) => {
      this.selectedAdvert = value;
    });
  }

  /**
   * Удаление текущего объявления
   */
  removeAdvert() {
    this.store.dispatch(new AdvertsDeleteAdvert(this.selectedAdvert));
  }

  /**
   * Закрытие диалогшового окна удаления объявления
   */
  closeDialog() {
    this.dialogRef.close();
  }
}
