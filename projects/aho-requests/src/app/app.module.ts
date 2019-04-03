import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconRegistry } from '@angular/material';
import { ResourceModule} from '@ngx-resource/handler-ngx-http';

import { metaReducers, IApplicationState, reducer, AhoRequestsActions, LoadInitialData } from './state';
import { AuthenticationModule } from 'kolenergo-core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationEffects } from './state/application.effects';
import { environment } from '../environments/environment';
import {AhoRequestsModule} from './aho-requests/aho-requests.module';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    ResourceModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // StoreRouterConnectingModule,
    AhoRequestsModule,
    AuthenticationModule.forRoot({
      apiUrl: 'http://10.50.0.153:3000',
      pathPrefix: '/authentication'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<IApplicationState>,
              private matIconRegistry: MatIconRegistry) {
    store.select((state: IApplicationState) => state)
      .subscribe((state: IApplicationState) => {
        console.log(state);
      });

    // store.dispatch(new LoadInitialData(7));
    registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
    this.matIconRegistry.registerFontClassAlias('fontawesome', 'fa');
    this.matIconRegistry.registerFontClassAlias('fortawesome', 'fas');
    this.matIconRegistry.registerFontClassAlias('fortawesome', 'far');
  }
}
