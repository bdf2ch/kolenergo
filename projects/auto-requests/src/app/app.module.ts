import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationResource } from './resources/application.resource';
import { ApplicationService } from './services/application.service';
import { reducer } from './application/ngrx/application.reducer';
import { ApplicationEffects } from './application/ngrx/application.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ResourceModule.forRoot(),
    StoreModule.forRoot({}),
    // EffectsModule.forRoot([ApplicationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatSnackBarModule
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
