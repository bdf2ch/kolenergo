import { Component } from '@angular/core';
import {MatDialog} from '@angular/material';
import {SignInComponent} from 'kolenergo-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'aho-requests';

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(SignInComponent, {
      width: '350px'
    });
  }
}
