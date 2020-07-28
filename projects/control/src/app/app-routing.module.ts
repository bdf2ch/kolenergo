import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializationGuard } from './guards/initialization.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'applications',
    pathMatch: 'full',
  },
  {
    path: 'applications',
    loadChildren: () => import('./features/applications/applications.module').then(m => m.ApplicationsModule),
    resolve: [InitializationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
