import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionGuard } from './guards/session.guard';
import { WelcomeGuard } from './guards/welcome.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./event-scheduler/event-scheduler.module').then(m => m.EventShedulerModule),
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
