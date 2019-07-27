import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatGridListModule, MatButtonModule } from '@angular/material';

import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './components/portal/portal.component';
import { StartComponent } from './components/start/start.component';

@NgModule({
  declarations: [
    PortalComponent,
    StartComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule
  ]
})
export class PortalModule { }
