import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PortalWrapperComponent} from './components/portal-wrapper/portal-wrapper.component';

const routes: Routes = [{
  path: '',
  component: PortalWrapperComponent,
  children: [
    {
      path: '',
      loadChildren: () => import('../start/start.module').then(m => m.StartModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
