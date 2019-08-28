import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PressReportsComponent } from './components/press-reports/press-reports.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';

const routes: Routes = [{
  path: '',
  component: PressReportsComponent,
  children: [
    {
      path: '',
      component: ReportsListComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PressReportsRoutingModule { }
