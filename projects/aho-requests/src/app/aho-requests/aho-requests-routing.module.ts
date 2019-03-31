import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AhoRequestsComponent } from './components/aho-requests/aho-requests.component';
import { RequestDetailsComponent } from './components/request-details/request-details.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { RequestDetailsGuard } from './guards/request-details.guard';
import { RequestsListGuard } from './guards/requests-list.guard';

const routes: Routes = [
  {
    path: '',
    component: AhoRequestsComponent,
    children: [
      {
        path: '',
        component: RequestsListComponent,
        resolve: [RequestsListGuard]
      },
      {
        path: 'request/:id',
        component: RequestDetailsComponent,
        resolve: [RequestDetailsGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhoRequestsRoutingModule { }
