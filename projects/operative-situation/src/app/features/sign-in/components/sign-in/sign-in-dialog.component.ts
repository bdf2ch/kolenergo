import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignInComponent } from '@kolenergo/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.less']
})
export class SignInDialogComponent implements OnInit {

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
    const signInDialog = this.dialog.getDialogById('sign-in-dialog');
    if (!signInDialog) {
      setTimeout(() => {
        this.dialog.open(SignInComponent, {
          id: 'sign-in-dialog',
          width: '350px',
          panelClass: 'sign-in-dialog',
          hasBackdrop: true,
          backdropClass: 'sign-in-backdrop',
          disableClose: true
        });
      }, 0);
    }
  }

}
