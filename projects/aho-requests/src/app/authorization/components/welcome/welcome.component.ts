import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignInComponent } from 'kolenergo-core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less']
})
export class WelcomeComponent implements OnInit {

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
    setTimeout(() => {
      this.dialog.open(SignInComponent, {
        id: 'sign-in-dialog',
        width: '350px',
        panelClass: 'sign-in-dialog',
        disableClose: true
      });
    }, 0);
  }
}
