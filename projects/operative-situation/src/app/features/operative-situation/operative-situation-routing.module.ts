import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperativeSituationWrapperComponent } from './components/operative-situation-wrapper/operative-situation-wrapper.component';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';

const routes: Routes = [
  {
    path: '',
    component: OperativeSituationWrapperComponent,
    children: [
      {
        path: '',
        component: OperativeSituationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperativeSituationRoutingModule { }
