import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatBadgeModule, MatListModule } from '@angular/material';

import { ContactListRoutingModule } from './contact-list-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ContactListComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatBadgeModule,
    MatListModule,
    SharedModule,
    ContactListRoutingModule
  ]
})
export class ContactListModule { }
