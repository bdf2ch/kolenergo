import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdvertsComponent } from './components/adverts/adverts.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';
import { NewAdvertComponent } from './components/new-advert/new-advert.component';
import { AdvertDetailsComponent } from './components/advert-details/advert-details.component';
import { AdvertsResolveGuard } from './guards/adverts-resolve-guard.service';

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
      path: 'new',
      component: NewAdvertComponent
    },
    {
      path: ':id',
      component: AdvertDetailsComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertsRoutingModule { }
