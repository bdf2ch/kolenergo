import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSnackBarModule,
  MatSidenavModule,
  MatButtonModule,
  MatProgressBarModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule
} from '@angular/material';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticationModule } from '@kolenergo/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationResource } from './resources/application.resource';
import { ApplicationService } from './services/application.service';
import { applicationReducer } from './ngrx/application.reducer';
import { ApplicationEffects } from './ngrx/application.effects';
import { environment } from '../environments/environment';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SearchComponent } from './components/search/search.component';
import { SignInModalComponent } from './components/sign-in-modal/sign-in-modal.component';
import { CurrentUserComponent } from './components/current-user/current-user.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SearchComponent,
    SignInModalComponent,
    CurrentUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ResourceModule.forRoot(),
    StoreModule.forRoot({app: applicationReducer}),
    EffectsModule.forRoot([ApplicationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    AuthenticationModule.forRoot({
      apiUrl: environment.apiUrl,
      appCode: environment.appCode,
      pathPrefix: '/authentication'
    }),
    MatSnackBarModule,
    MatSidenavModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ],
  providers: [
    ApplicationResource,
    ApplicationService
  ],
  entryComponents: [
    SignInModalComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
