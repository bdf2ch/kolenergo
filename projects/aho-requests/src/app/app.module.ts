import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


import { AuthenticationModule } from 'kolenergo-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Store, StoreModule} from '@ngrx/store';
import { metaReducers, IApplicationState} from './state';

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
    MatButtonModule,
    MatDialogModule
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
  }
}
