import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatGridListModule,
  MatButtonModule,
  MatBadgeModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ButtonModule, SliderModule } from '@kolenergo/core';
import { PortalRoutingModule } from './portal-routing.module';
import { PortalComponent } from './components/portal/portal.component';
import { StartComponent } from './components/start/start.component';
import { AdvertsSectionComponent } from './components/adverts-section/adverts-section.component';
import { reducer } from '../ngrx';
import { ApplicationEffects } from '../ngrx';
import { InitialDataResolveGuard } from './guards/initial-data-resolve.guard';
import { PhonebookSearchComponent } from './components/phonebook-search/phonebook-search.component';
import { AdvertComponent } from './components/advert/advert.component';
import { ArticlesSectionComponent } from './components/articles-section/articles-section.component';

@NgModule({
  declarations: [
    PortalComponent,
    StartComponent,
    AdvertsSectionComponent,
    PhonebookSearchComponent,
    AdvertComponent,
    ArticlesSectionComponent
  ],
  imports: [
    CommonModule,
    PortalRoutingModule,
    StoreModule.forFeature('portal', reducer),
    EffectsModule.forFeature([ApplicationEffects]),
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    ButtonModule,
    SliderModule
  ],
  providers: [
    InitialDataResolveGuard
  ],
  exports: [
    AdvertsSectionComponent,
    AdvertComponent
  ]
})
export class PortalModule { }
