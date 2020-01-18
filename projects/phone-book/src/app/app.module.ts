import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatProgressBarModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer, SearchWithFiltersModule, ButtonModule, AuthenticationModule } from '@kolenergo/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationEffects, phoneBookReducer, RouterEffects, SessionEffects } from './ngrx';
import { AppControlsComponent } from './components/app-controls/app-controls.component';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { ApplicationResource } from './resources/application.resource';
import { ApplicationService } from './services/application.service';
import { PhoneBookComponent } from './components/phone-book/phone-book.component';
import { environment } from '../environments/environment';
import { DivisionTreeComponent } from './components/division-tree/division-tree.component';
import { DivisionTreeItemComponent } from './components/division-tree-item/division-tree-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AppControlsComponent,
    SideNavigationComponent,
    PhoneBookComponent,
    DivisionTreeComponent,
    DivisionTreeItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      phoneBook: phoneBookReducer,
      session: reducer
    }),
    EffectsModule.forRoot([ApplicationEffects, RouterEffects, SessionEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatSidenavModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    AuthenticationModule.forRoot({
      appCode: 'PHONE_BOOK_APP',
      apiUrl: 'http://127.0.0.1:3000',
      pathPrefix: '/authentication'
    }),
    SearchWithFiltersModule,
    ButtonModule
  ],
  providers: [
    ApplicationResource,
    ApplicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
