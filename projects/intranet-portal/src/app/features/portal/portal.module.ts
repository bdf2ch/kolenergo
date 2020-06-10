import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatIconModule, MatButtonModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalWrapperComponent } from './components/portal-wrapper/portal-wrapper.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ApplicationIconComponent } from './components/application-icon/application-icon.component';
import { portalReducer } from '../../ngrx';
import { environment } from '../../../environments/environment';




@NgModule({
  declarations: [
    PortalWrapperComponent,
    SearchBarComponent,
    ApplicationIconComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    StoreModule.forFeature('portal', portalReducer),
    EffectsModule.forFeature([]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    PortalRoutingModule
  ]
})
export class PortalModule { }
