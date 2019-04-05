import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionGuard } from './guards/session.guard';
import { WelcomeGuard } from './aho-requests/guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './aho-requests/aho-requests.module#AhoRequestsModule',
    resolve: [SessionGuard]
  },
  {
    path: 'welcome',
    loadChildren: './authorization/authorization.module#AuthorizationModule',
    canActivate: [WelcomeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

