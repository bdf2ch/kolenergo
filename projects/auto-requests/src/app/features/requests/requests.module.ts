import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsWrapperComponent } from './components/requests-wrapper/requests-wrapper.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';


@NgModule({
  declarations: [RequestsWrapperComponent, RequestsListComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
