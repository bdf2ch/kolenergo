import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionGuard } from './aho-requests/guards/session.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './aho-requests/aho-requests.module#AhoRequestsModule',
    canActivate: [
      SessionGuard
    ]
  },
  {
    path: 'welcome',
    loadChildren: './authorization/authorization.module#AuthorizationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
