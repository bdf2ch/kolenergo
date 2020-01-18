import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationWrapperComponent } from './components/application-wrapper/application-wrapper.component';
import { reducer } from './ngrx/application.reducer';

@NgModule({
  declarations: [
    ApplicationWrapperComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('application', reducer),
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
