import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { SignInComponent } from '@kolenergo/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.less'],
  styles: [':host { display: block; height: 100%}']
})
export class AuthorizationComponent implements OnInit {

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
