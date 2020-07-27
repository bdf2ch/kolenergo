import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionGuard } from './guards/session.guard';
import { WelcomeGuard } from './aho-requests/guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./aho-requests/aho-requests.module').then(m => m.AhoRequestsModule),
    resolve: [SessionGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule),
    canActivate: [WelcomeGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

