import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './features/operative-situation/operative-situation.module#OperativeSituationModule'
  },
  {
    path: 'sign-in',
    loadChildren: './features/sign-in/sign-in.module#SignInModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
