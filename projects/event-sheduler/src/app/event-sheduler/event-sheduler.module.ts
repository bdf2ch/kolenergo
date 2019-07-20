import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatStepperModule,
  MatTabsModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatListModule
} from '@angular/material';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule
} from '@angular/material-moment-adapter';


import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from '../ngrx/app.reducers';
import { AppEffects } from '../ngrx/app.effects';

import { SearchWithFiltersModule, UserSearchModule, UserListModule, CompanySelectModule } from '@kolenergo/core';
import { EventShedulerRoutingModule } from './event-sheduler-routing.module';
import { EventShedulerComponent } from './components/event-sheduler/event-sheduler.component';
import { SheduleComponent } from './components/shedule/shedule.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { RequestAddDialogComponent } from './components/request-add-dialog/request-add-dialog.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';


@NgModule({
  declarations: [
    EventShedulerComponent,
    SheduleComponent,
    CalendarComponent,
    RequestAddDialogComponent
  ],
  entryComponents: [
    RequestAddDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventShedulerRoutingModule,
    StoreModule.forFeature('esa', reducer),
    EffectsModule.forFeature([AppEffects]),
    SearchWithFiltersModule,
    UserListModule,
    UserSearchModule.forRoot({
      apiUrl: 'http://127.0.0.1:3000',
      pathPrefix: '/users'
    }),
    CompanySelectModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatListModule,
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class EventShedulerModule { }
