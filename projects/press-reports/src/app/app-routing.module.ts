import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionGuard } from './guards/session-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./press-reports/press-reports.module').then(m => m.PressReportsModule),
    resolve: [
      SessionGuard
    ]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./authorization/authorization.module').then(m => m.AuthorizationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
