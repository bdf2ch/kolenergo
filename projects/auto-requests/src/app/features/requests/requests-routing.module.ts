import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestsWrapperComponent } from './components/requests-wrapper/requests-wrapper.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';


const routes: Routes = [{
  path: '',
  component: RequestsWrapperComponent,
  children: [
    {
      path: '',
      component: RequestsListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
