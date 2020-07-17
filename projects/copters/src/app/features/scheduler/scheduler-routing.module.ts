import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulerWrapperComponent } from './components/scheduler-wrapper/scheduler-wrapper.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

const routes: Routes = [{
  path: '',
  component: SchedulerWrapperComponent,
  children: [
    {
      path: '',
      component: SchedulerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
