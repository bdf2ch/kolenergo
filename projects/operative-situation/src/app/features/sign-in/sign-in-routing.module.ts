import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInWrapperComponent } from './components/sign-in-wrapper/sign-in-wrapper.component';
import { SignInDialogComponent } from './components/sign-in/sign-in-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: SignInWrapperComponent,
    children: [
      {
        path: '',
        component: SignInDialogComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }
