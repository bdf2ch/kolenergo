import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationComponent } from './components/authorization/authorization.component';
import { WelcomeComponent } from './components/sign-in/welcome.component';

const routes: Routes = [{
  path: '',
  component: AuthorizationComponent,
  children: [
    {
      path: '',
      component: WelcomeComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
