import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { WelcomeComponent } from './components/sign-in/welcome.component';

@NgModule({
  declarations: [AuthorizationComponent, WelcomeComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
