import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationWrapperComponent } from './components/application-wrapper/application-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationWrapperComponent,
    children: [
      {
        path: '',
        loadChildren: './features/requests/requests.module#RequestsModule'
      },
      {
        path: 'transport',
        loadChildren: './features/transport/transport.module#TransportModule'
      },
      {
        path: 'drivers',
        loadChildren: './features/drivers/drivers.module#DriversModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {}
