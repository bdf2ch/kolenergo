import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticationModule } from '@kolenergo/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SessionGuard } from './guards/session-guard.service';
import { ApplicationService } from './services/application.service';
import { ApplicationEffects } from './ngrx/application.effects';
import { ApplicationResource } from './resources/application.resource';
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import localeRuExtra from "@angular/common/locales/extra/ru";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS} from "@angular/material-moment-adapter";
import {MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material";

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule.forRoot({
      apiUrl: 'http://10.50.0.153:3000',
      pathPrefix: '/authentication'
    }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([ApplicationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    SessionGuard,
    ApplicationService,
    ApplicationResource,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
  }
}
