import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSidenavModule, MatButtonModule, MatProgressBarModule, MatIconModule, MatTooltipModule } from '@angular/material';

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

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
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
    MatTooltipModule
  ],
  providers: [
    ApplicationResource,
    ApplicationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
