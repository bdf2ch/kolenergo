import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitializationGuard } from './guards/initialization.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/requests/requests.module').then(m => m.RequestsModule),
    resolve: [InitializationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
