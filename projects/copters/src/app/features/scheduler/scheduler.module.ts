import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerWrapperComponent } from './components/scheduler-wrapper/scheduler-wrapper.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

@NgModule({
  declarations: [SchedulerWrapperComponent, SchedulerComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ]
})
export class SchedulerModule { }
