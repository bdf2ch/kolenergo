import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatButtonModule, MatMenuModule, MatIconModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { OperativeSituationRoutingModule } from './operative-situation-routing.module';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { OperativeSituationWrapperComponent } from './components/operative-situation-wrapper/operative-situation-wrapper.component';
import { OperativeSituationEffects, reducer } from './ngrx';
import {environment} from '../../../environments/environment';
import { DivisionTreeComponent } from './components/division-tree/division-tree.component';
import { DivisionTreeItemComponent } from './components/division-tree-item/division-tree-item.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ReportsTimeTableComponent } from './components/reports-time-table/reports-time-table.component';


@NgModule({
  declarations: [OperativeSituationComponent, OperativeSituationWrapperComponent, DivisionTreeComponent, DivisionTreeItemComponent, ReportsTimeTableComponent],
  imports: [
    CommonModule,
    OperativeSituationRoutingModule,
    StoreModule.forFeature('osr', reducer),
    EffectsModule.forFeature([OperativeSituationEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule
  ]
})
export class OperativeSituationModule { }
