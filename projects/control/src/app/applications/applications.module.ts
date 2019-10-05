import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsEffects, reducer } from './ngrx';
import { environment } from '../../environments/environment';
import { ApplicationsComponent } from './components/applications/applications.component';


@NgModule({
  declarations: [ApplicationsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    StoreModule.forFeature('applications', reducer),
    EffectsModule.forFeature([ApplicationsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ]
})
export class ApplicationsModule {}
