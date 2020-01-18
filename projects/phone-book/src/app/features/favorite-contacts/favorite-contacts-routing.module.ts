import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteContactsComponent } from './components/favorite-contacts/favorite-contacts.component';

const routes: Routes = [
  {
    path: '',
    component: FavoriteContactsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteContactsRoutingModule { }
