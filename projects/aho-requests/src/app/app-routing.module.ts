import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './aho-requests/aho-requests.module#AhoRequestsModule'
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
