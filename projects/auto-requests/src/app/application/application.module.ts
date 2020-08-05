import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationWrapperComponent } from './components/application-wrapper/application-wrapper.component';
import { applicationReducer } from '../ngrx/application.reducer';

@NgModule({
  declarations: [
    ApplicationWrapperComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('application', applicationReducer),
    ApplicationRoutingModule
  ]
})
export class ApplicationModule { }
