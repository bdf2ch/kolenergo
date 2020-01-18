import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    ContactComponent
  ]
})
export class SharedModule { }
