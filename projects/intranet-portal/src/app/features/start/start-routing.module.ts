import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartWrapperComponent } from './components/start-wrapper/start-wrapper.component';
import { StartComponent } from './components/start/start.component';

const routes: Routes = [{
  path: '',
  component: StartWrapperComponent,
  children: [
    {
      path: '',
      component: StartComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule { }
