import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { AuthenticationModule, SignInComponent } from '@kolenergo/core';

@NgModule({
  declarations: [
    WelcomeComponent,
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    AuthenticationModule.forRoot({
      apiUrl: 'http://10.50.0.153:3000',
      pathPrefix: '/authentication'
    })
  ],
  entryComponents: [
    SignInComponent
  ]
})
export class AuthorizationModule { }
