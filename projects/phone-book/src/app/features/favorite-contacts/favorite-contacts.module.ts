import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteContactsRoutingModule } from './favorite-contacts-routing.module';
import { FavoriteContactsComponent } from './components/favorite-contacts/favorite-contacts.component';

@NgModule({
  declarations: [FavoriteContactsComponent],
  imports: [
    CommonModule,
    FavoriteContactsRoutingModule
  ]
})
export class FavoriteContactsModule { }
