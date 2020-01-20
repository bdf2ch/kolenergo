import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StoreModule } from '@ngrx/store';

import { ButtonModule } from '@kolenergo/core';
import { OperativeSituationRoutingModule } from './operative-situation-routing.module';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { OperativeSituationWrapperComponent } from './components/operative-situation-wrapper/operative-situation-wrapper.component';
import {OperativeSituationEffects, reducer} from './ngrx';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';

@NgModule({
  declarations: [OperativeSituationComponent, OperativeSituationWrapperComponent],
  imports: [
    CommonModule,
    OperativeSituationRoutingModule,
    StoreModule.forFeature('osr', reducer),
    EffectsModule.forFeature([OperativeSituationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatSidenavModule,
    ButtonModule
  ]
})
export class OperativeSituationModule { }
