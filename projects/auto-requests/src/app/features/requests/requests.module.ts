import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatMenuModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsWrapperComponent } from './components/requests-wrapper/requests-wrapper.component';
import { RequestsListComponent } from './components/requests-list/requests-list.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { RequestsGridComponent } from './components/requests-grid/requests-grid.component';
import { RoutePathComponent } from './components/route-path/route-path.component';
import { environment } from '../../../environments/environment';
import { RequestsEffects, requestsReducer } from './ngrx';


@NgModule({
  declarations: [
    RequestsWrapperComponent,
    RequestsListComponent,
    TabsComponent,
    RequestsGridComponent,
    RoutePathComponent
  ],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    StoreModule.forFeature('requests', requestsReducer),
    EffectsModule.forFeature([RequestsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    RoutePathComponent
  ]
})
export class RequestsModule { }
