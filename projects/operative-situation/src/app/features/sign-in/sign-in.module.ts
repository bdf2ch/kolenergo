import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInDialogComponent } from './components/sign-in/sign-in-dialog.component';
import { SignInWrapperComponent } from './components/sign-in-wrapper/sign-in-wrapper.component';

@NgModule({
  declarations: [SignInDialogComponent, SignInWrapperComponent],
  imports: [
    CommonModule,
    SignInRoutingModule
  ]
})
export class SignInModule { }
