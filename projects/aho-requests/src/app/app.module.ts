import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResourceModule} from '@ngx-resource/handler-ngx-http';

import { metaReducers, IApplicationState, reducer, AhoRequestsActions, LoadInitialData } from './state';


// import { AuthenticationModule } from 'kolenergo-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppEffects } from './state/app.effects';

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
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressBarModule,
    /*
    AuthenticationModule.forRoot({
      apiUrl: 'http://10.50.0.153:3000',
      pathPrefix: '/authentication'
    }),
    */
    ResourceModule.forRoot(),
    StoreModule.forRoot({ aho: reducer }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<IApplicationState>) {
    store.select((state: IApplicationState) => state)
      .subscribe((state: IApplicationState) => {
        console.log(state);
      });

    store.dispatch(new LoadInitialData());
  }
}
