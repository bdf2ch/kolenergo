import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitialGuard } from './guards/initial.guard';
import { PhoneBookComponent } from './components/phone-book/phone-book.component';
import {SessionGuard} from './guards/session.guard';

const routes: Routes = [
  {
    path: '',
    component: PhoneBookComponent,
    resolve: [SessionGuard, InitialGuard],
    children: [
      {
        path: '',
        loadChildren: './features/contact-list/contact-list.module#ContactListModule'
      },
      {
        path: 'favorites',
        loadChildren: './features/favorite-contacts/favorite-contacts.module#FavoriteContactsModule'
      },
      {
        path: 'account',
        loadChildren: './features/user-account/user-account.module#UserAccountModule'
      },
      {
        path: 'help',
        loadChildren: './features/help/help.module#HelpModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
