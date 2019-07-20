import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventShedulerComponent } from './components/event-sheduler/event-sheduler.component';
import { SheduleComponent } from './components/shedule/shedule.component';

const routes: Routes = [
  {
    path: '',
    component: EventShedulerComponent,
    children: [
      {
        path: '',
        component: SheduleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventShedulerRoutingModule { }
