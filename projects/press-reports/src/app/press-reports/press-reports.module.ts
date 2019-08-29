import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatDatepickerModule
} from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule
} from '@angular/material-moment-adapter';

import { PressReportsRoutingModule } from './press-reports-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { pressReportsReducer, PressReportsEffects } from './ngrx';
import { PressReportsComponent } from './components/press-reports/press-reports.component';
import { ReportsListComponent } from './components/reports-list/reports-list.component';
import { ReportDatesComponent } from './components/report-dates/report-dates.component';
import { environment } from '../../environments/environment';
import { ReportAddDialogComponent } from './components/report-add-dialog/report-add-dialog.component';
import { PressReportsResource } from './resources/press-reports.resource';
import { PressReportsService } from './services/press-reports.service';
import { ReportDeleteDialogComponent } from './components/report-delete-dialog/report-delete-dialog.component';
import { ReportEditDialogComponent } from './components/report-edit-dialog/report-edit-dialog.component';

@NgModule({
  declarations: [
    PressReportsComponent,
    ReportsListComponent,
    ReportDatesComponent,
    ReportAddDialogComponent,
    ReportDeleteDialogComponent,
    ReportEditDialogComponent
  ],
  imports: [
    CommonModule,
    PressReportsRoutingModule,
    StoreModule.forFeature('reports', pressReportsReducer),
    EffectsModule.forFeature([PressReportsEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatMomentDateModule,
    FormsModule
  ],
  providers: [
    PressReportsResource,
    PressReportsService
  ],
  entryComponents: [
    ReportAddDialogComponent,
    ReportEditDialogComponent,
    ReportDeleteDialogComponent
  ]
})
export class PressReportsModule { }
