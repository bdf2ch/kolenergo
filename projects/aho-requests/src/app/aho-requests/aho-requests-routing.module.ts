import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';

const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhoRequestsRoutingModule { }
