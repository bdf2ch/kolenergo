import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortalComponent } from './components/portal/portal.component';
import { StartComponent } from './components/start/start.component';
import { InitialDataResolveGuard } from './guards/initial-data-resolve.guard';
import {OurPeopleResolveGuard} from './guards/our-people-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: PortalComponent,
    resolve: [
      InitialDataResolveGuard
    ],
    children: [
      {
        path: '',
        component: StartComponent
      },
      {
        path: 'adverts',
        loadChildren: '../adverts/adverts.module#AdvertsModule'
      },
      {
        path: 'our-people',
        loadChildren: '../articles/articles.module#ArticlesModule',
        resolve: [
          OurPeopleResolveGuard
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
