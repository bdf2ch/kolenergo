import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AdvertDeleteDialogComponent } from '../advert-delete-dialog/advert-delete-dialog.component';
import { Advert } from '../../models';
import { selectSelectedAdvert } from '../../ngrx';
import { IApplicationState } from '../../../ngrx';
import { AdvertEditDialogComponent } from '../advert-edit-dialog/advert-edit-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-advert-details',
  templateUrl: './advert-details.component.html',
  styleUrls: ['./advert-details.component.less']
})
export class AdvertDetailsComponent implements OnInit {
  public selectedAdvert$: Observable<Advert>;
  public selectedAdvert: Advert;
  public markup: any;

  constructor(private readonly store: Store<IApplicationState>,
              private readonly sanitizer: DomSanitizer,
              private readonly dialog: MatDialog) {}

  ngOnInit() {
    this.selectedAdvert$ = this.store.pipe(select(selectSelectedAdvert));
    this.selectedAdvert$.subscribe((value: Advert) => {
      if (value) {
        this.selectedAdvert = value;
        this.markup = this.sanitizer.bypassSecurityTrustHtml(value.markup);
      }
    });
  }

  /**
   * Открытие диалогового окна редактирования объявления
   */
  openEditAdvertDialog() {
    this.dialog.open(AdvertEditDialogComponent, {
      width: '900px',
      minHeight: '650px',
      panelClass: 'add-advert-dialog'
    });
  }

  /**
   * Открытие диалогового окна удалени объявления
   */
  openRemoveAdvertDialog() {
    this.dialog.open(AdvertDeleteDialogComponent, {
      id: 'remove-advert-dialog',
      width: '350px'
    });
  }

}
