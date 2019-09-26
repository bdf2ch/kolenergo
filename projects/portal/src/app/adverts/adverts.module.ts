import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { PortalModule } from '../portal/portal.module';
import { AdvertsRoutingModule } from './adverts-routing.module';
import { AdvertsComponent } from './components/adverts/adverts.component';
import { AdvertsListComponent } from './components/adverts-list/adverts-list.component';
import { AdvertAddDialogComponent } from './components/advert-add-dialog/advert-add-dialog.component';
import { AdvertDetailsComponent } from './components/advert-details/advert-details.component';
import { AdvertsResource } from './resources/adverts.resource';
import { AdvertsService } from './services/adverts.service';
import { AdvertsEffects, reducer } from './ngrx';
import { AttachmentsListComponent } from './components/attachments-list/attachments-list.component';
import { AdvertsSearchComponent } from './components/adverts-search/adverts-search.component';
import { AdvertDeleteDialogComponent } from './components/advert-delete-dialog/advert-delete-dialog.component';
import { AdvertEditDialogComponent } from './components/advert-edit-dialog/advert-edit-dialog.component';
import { environment } from '../../environments/environment';
import { FileSizePipe } from './pipes/file-size.pipe';

@NgModule({
  declarations: [
    AdvertsComponent,
    AdvertsListComponent,
    AdvertAddDialogComponent,
    AdvertDetailsComponent,
    AttachmentsListComponent,
    AdvertsSearchComponent,
    AdvertDeleteDialogComponent,
    AdvertEditDialogComponent,
    FileSizePipe
  ],
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
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    CKEditorModule,
    AdvertsRoutingModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PortalModule
  ],
  providers: [
    AdvertsResource,
    AdvertsService
  ],
  entryComponents: [
    AdvertAddDialogComponent,
    AdvertEditDialogComponent,
    AdvertDeleteDialogComponent
  ]
})
export class AdvertsModule { }
