import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { ButtonModule } from '@kolenergo/core';

import { OperativeSituationRoutingModule } from './operative-situation-routing.module';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { OperativeSituationWrapperComponent } from './components/operative-situation-wrapper/operative-situation-wrapper.component';

@NgModule({
  declarations: [OperativeSituationComponent, OperativeSituationWrapperComponent],
  imports: [
    CommonModule,
    OperativeSituationRoutingModule,
    MatSidenavModule,
    ButtonModule
  ]
})
export class OperativeSituationModule { }
