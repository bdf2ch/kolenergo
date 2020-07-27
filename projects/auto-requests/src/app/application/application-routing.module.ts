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
        loadChildren: () => import('./features/requests/requests.module').then(m => m.RequestsModule)
      },
      {
        path: 'transport',
        loadChildren: () => import('./features/transport/transport.module').then(m => m.TransportModule)
      },
      {
        path: 'drivers',
        loadChildren: () => import('./features/drivers/drivers.module').then(m => m.DriversModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule {}
