import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';

@NgModule({
  declarations: [WelcomeComponent, AuthorizationComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule
  ]
})
export class AuthorizationModule { }
