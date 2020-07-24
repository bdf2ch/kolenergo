import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsWrapperComponent } from './components/applications-wrapper/applications-wrapper.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsWrapperComponent,
    children: [
      {
        path: '',
        component: ApplicationsListComponent
      },
      {
        path: ':id',
        component: ApplicationDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationsRoutingModule { }
