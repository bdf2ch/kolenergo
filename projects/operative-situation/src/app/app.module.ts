import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticationModule } from '@kolenergo/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormWithStepsComponent } from './features/operative-situation/components/form-with-steps/form-with-steps.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule, MatButtonModule, MatSlideToggleModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {ReportAddDialogComponent} from './features/operative-situation/components/report-add-dialog/report-add-dialog.component';
import {FormStepComponent} from './features/operative-situation/components/form-step/form-step.component';
import {ReportEditDialogComponent} from './features/operative-situation/components/report-edit-dialog/report-edit-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    FormWithStepsComponent,
    FormStepComponent,
    ReportAddDialogComponent,
    ReportEditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    AuthenticationModule.forRoot({
      apiUrl: environment.apiUrl,
      appCode: environment.appCode,
      pathPrefix: '/authentication'
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents: [ReportAddDialogComponent, ReportEditDialogComponent],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
