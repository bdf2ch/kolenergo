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
        loadChildren: () => import('./features/contact-list/contact-list.module').then(m => m.ContactListModule)
      },
      {
        path: 'favorites',
        loadChildren: () => import('./features/favorite-contacts/favorite-contacts.module').then(m => m.FavoriteContactsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./features/user-account/user-account.module').then(m => m.UserAccountModule)
      },
      {
        path: 'help',
        loadChildren: () => import('./features/help/help.module').then(m => m.HelpModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
