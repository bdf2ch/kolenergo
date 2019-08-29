import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionGuard } from './guards/session-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: './press-reports/press-reports.module#PressReportsModule',
    resolve: [
      SessionGuard
    ]
  },
  {
    path: 'sign-in',
    loadChildren: './authorization/authorization.module#AuthorizationModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
