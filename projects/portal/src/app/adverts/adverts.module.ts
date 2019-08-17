import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatGridListModule, MatSnackBarModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PortalModule } from '../portal/portal.module';
import { AdvertsRoutingModule } from './adverts-routing.module';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';
import { NewAdvertComponent } from './components/new-advert/new-advert.component';
import { AdvertDetailsComponent } from './components/advert-details/advert-details.component';
import { AdvertsResource } from './resources/adverts.resource';
import { AdvertsService } from './services/adverts.service';
import { AdvertsEffects, reducer } from './ngrx';
import { environment } from '../../environments/environment';
import { AttachmentsListComponent } from './components/attachments-list/attachments-list.component';

@NgModule({
  declarations: [AdvertsComponent, AdvertsListComponent, NewAdvertComponent, AdvertDetailsComponent, AttachmentsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature('adverts', reducer),
    EffectsModule.forFeature([AdvertsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    CKEditorModule,
    AdvertsRoutingModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    PortalModule
  ],
  providers: [
    AdvertsResource,
    AdvertsService
  ],
  entryComponents: [
    NewAdvertComponent
  ]
})
export class AdvertsModule { }
