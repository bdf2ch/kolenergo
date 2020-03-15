import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatSidenavModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { OperativeSituationRoutingModule } from './operative-situation-routing.module';
import { OperativeSituationComponent } from './components/operative-situation/operative-situation.component';
import { OperativeSituationWrapperComponent } from './components/operative-situation-wrapper/operative-situation-wrapper.component';
import { OperativeSituationEffects, reducer } from './ngrx';
import { DivisionTreeComponent } from './components/division-tree/division-tree.component';
import { DivisionTreeItemComponent } from './components/division-tree-item/division-tree-item.component';
import { ReportsTimeTableComponent } from './components/reports-time-table/reports-time-table.component';
import { FormWithStepsComponent } from './components/form-with-steps/form-with-steps.component';
import { FormStepComponent } from './components/form-step/form-step.component';
import { ReportAddDialogComponent } from './components/report-add-dialog/report-add-dialog.component';
import { environment } from '../../../environments/environment';
import { ReportComponent } from './components/report/report.component';
import { WeatherSummaryComponent } from './components/weather-summary/weather-summary.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    OperativeSituationComponent,
    OperativeSituationWrapperComponent,
    DivisionTreeComponent,
    DivisionTreeItemComponent,
    ReportsTimeTableComponent,
    // FormWithStepsComponent,
    // FormStepComponent,
    // ReportAddDialogComponent,
    ReportComponent,
    WeatherSummaryComponent,
    IndicatorComponent,
    ConsumptionComponent,
    TimelineComponent
  ],
  imports: [
    CommonModule,
    OperativeSituationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('osr', reducer),
    EffectsModule.forFeature([OperativeSituationEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ],
  exports: [
    // ReportAddDialogComponent
  ],
  entryComponents: [
    // ReportAddDialogComponent
  ]
})
export class OperativeSituationModule { }
