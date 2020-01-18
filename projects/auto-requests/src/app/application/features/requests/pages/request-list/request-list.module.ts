import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestListRoutingModule } from './request-list-routing.module';
import { RequestListComponent } from './components/request-list/request-list.component';

@NgModule({
  declarations: [RequestListComponent],
  imports: [
    CommonModule,
    RequestListRoutingModule
  ]
})
export class RequestListModule { }
