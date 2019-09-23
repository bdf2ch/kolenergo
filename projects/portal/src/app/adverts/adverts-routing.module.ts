import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertsComponent } from './components/adverts/adverts.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';
import { AdvertDetailsComponent } from './components/advert-details/advert-details.component';
import { AdvertsResolveGuard } from './guards/adverts-resolve-guard.service';
import { AdvertResolveGuard } from './guards/advert-resolve-guard.service';

const routes: Routes = [{
  path: '',
  component: AdvertsComponent,
  children: [
    {
      path: '',
      component: AdvertsListComponent,
      resolve: [AdvertsResolveGuard]
    },
    {
      path: ':id',
      component: AdvertDetailsComponent,
      resolve: [AdvertResolveGuard]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertsRoutingModule { }
