import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInWrapperComponent } from './components/sign-in-wrapper/sign-in-wrapper.component';

@NgModule({
  declarations: [SignInComponent, SignInWrapperComponent],
  imports: [
    CommonModule,
    SignInRoutingModule
  ]
})
export class SignInModule { }
