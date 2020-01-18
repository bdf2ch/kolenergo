import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { RequestsRoutingModule } from './requests-routing.module';
import { reducer } from './ngrx/requests.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('requests', reducer),
    RequestsRoutingModule
  ]
})
export class RequestsModule { }
