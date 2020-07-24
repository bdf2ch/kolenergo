import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsEffects, reducer } from './ngrx';
import { environment } from '../../../environments/environment';
import { ApplicationsWrapperComponent } from './components/applications-wrapper/applications-wrapper.component';
import { ApplicationsListComponent } from './components/applications-list/applications-list.component';
import { ApplicationDetailsComponent } from './components/application-details/application-details.component';


@NgModule({
  declarations: [ApplicationsWrapperComponent, ApplicationsListComponent, ApplicationDetailsComponent],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    StoreModule.forFeature('applications', reducer),
    EffectsModule.forFeature([ApplicationsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ]
})
export class ApplicationsModule {}
