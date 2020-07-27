import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializationGuard } from './guards/initialization.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/operative-situation/operative-situation.module').then(m => m.OperativeSituationModule),
    resolve: [InitializationGuard]
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./features/sign-in/sign-in.module').then(m => m.SignInModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
