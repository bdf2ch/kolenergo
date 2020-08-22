import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MatMomentDateModule } from '@angular/material-moment-adapter';
import {
  MatSnackBarModule,
  MatSidenavModule,
  MatButtonModule,
  MatProgressBarModule,
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatMenuModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthenticationModule, UserSearchModule } from '@kolenergo/core';
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
import { AddRequestDialogComponent } from './components/add-request-dialog/add-request-dialog.component';
import { RouteTypeaheadComponent } from './components/route-typeahead/route-typeahead.component';
import { RoutePathComponent } from './components/route-path/route-path.component';
import { UserSearchComponent } from './components/user-search/user-search.component';

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
    AppComponent,
    CalendarComponent,
    SearchComponent,
    SignInModalComponent,
    CurrentUserComponent,
    AddRequestDialogComponent,
    RouteTypeaheadComponent,
    RoutePathComponent,
    UserSearchComponent
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
    MatMenuModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatMomentDateModule,
    UserSearchModule.forRoot({apiUrl: 'http://127.0.0.1:3000', pathPrefix: '/users'})
  ],
  providers: [
    ApplicationResource,
    ApplicationService,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ],
  entryComponents: [
    SignInModalComponent,
    AddRequestDialogComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
